<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\PaymentOtpHistory;
use App\Models\Plan;
use App\Models\Spend;
use App\Models\User;
use App\Models\UserPlan;
use App\Models\Setting;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard(Request $request)
    {
        $search = $request->search;

        $totalCommitment = UserPlan::sum('yearly_amount');
        $fund_raised = Payment::sum('amount');
        $totalSpent = Spend::sum('amount');
        $totalBalance = $fund_raised - $totalSpent;

        $totalDoner = User::whereHas('userPlans.payments', function ($query) {
            $query->where('amount', '>', 0);
        })->count();

        $recentPayments = Payment::with('user')->latest()->take(5)->get();
        $recentExpenses = Spend::latest()->take(5)->get();

        $allUsers = User::when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        })
            ->latest()
            ->paginate(6)
            ->withQueryString(); // IMPORTANT

        return Inertia::render('admin/dashboard', [
            'fund_raised' => $fund_raised,
            'totalSpent' => $totalSpent,
            'totalBalance' => $totalBalance,
            'totalDoner' => $totalDoner,
            'totalCommitment' => $totalCommitment,
            'recentPayments' => $recentPayments,
            'recentExpenses' => $recentExpenses,
            'allUsers' => $allUsers,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function plans()
    {
        $plans = Plan::latest()->get();
        return Inertia::render('admin/plans', [
            'plans' => $plans,
        ]);
    }

    public function storePlan(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'yearly_amount' => 'required|numeric|min:1',
            'duration_years' => 'required|integer|min:1',
        ]);

        Plan::create([
            'name' => $request->name,
            'yearly_amount' => $request->yearly_amount,
            'duration_years' => $request->duration_years,
        ]);

        return redirect()->back()->with('success', 'Plan created successfully');
    }

    public function updatePlan(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'yearly_amount' => 'required|numeric|min:1',
            'duration_years' => 'required|integer|min:1',
        ]);

        $plan = Plan::findOrFail($id);
        $plan->update([
            'name' => $request->name,
            'yearly_amount' => $request->yearly_amount,
            'duration_years' => $request->duration_years,
        ]);

        return redirect()->back()->with('success', 'Plan updated successfully');
    }

    public function destroyPlan($id)
    {
        $plan = Plan::findOrFail($id);

        if ($plan->userPlans()->exists()) {
            return redirect()->back()->withErrors(['plan' => 'Cannot delete plan — it is assigned to users.']);
        }

        $plan->delete();
        return redirect()->back()->with('success', 'Plan deleted successfully');
    }

    public function destroyUser($id)
    {
        if (auth()->id() === (int) $id) {
            return redirect()->back()->withErrors(['user' => 'You cannot delete your own account.']);
        }

        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully');
    }
    public function userdetail($id)
    {
        $user = User::findOrFail($id);
        $userPlan = UserPlan::where('user_id', $id)->first();
        $payingAmount = UserPlan::where('user_id', $id)->sum('yearly_amount');
        $totalPaidLifetime = Payment::where('user_id', $id)->sum('amount');

        return Inertia::render('admin/userdetail', [
            'user' => $user,
            'plan' => $userPlan ? $userPlan->plan : 'null',
            'payments' => [],
            'stats' => [
                'payingAmount' => $payingAmount,
                'lifetimePaid' => $totalPaidLifetime,
            ],
            'ngo_plans' => Plan::all(),
            'user_plans' => UserPlan::with('plan')
                ->where('user_id', $id)
                ->latest()
                ->get()
                ->map(function ($up) {
                    return [
                        'id' => $up->id,
                        'name' => $up->plan?->name,
                        'yearly_amount' => $up->yearly_amount,
                        'due_amount' => $up->dueAmount(),
                        'start_date' => $up->start_date,
                        'end_date' => $up->end_date,
                        'status' => $up->status,
                        'percentage_paid' => $up->yearly_amount > 0 ? round((($up->yearly_amount - $up->dueAmount()) / $up->yearly_amount) * 100) : 0,
                        'payments' => $up->payments()->latest()->get()->map(function ($payment) {
                            return [
                                'amount' => $payment->amount,
                                'payment_date' => $payment->payment_date,
                                'payment_mode' => $payment->payment_mode,
                            ];
                        }),
                    ];
                }),
            'due_plans' => UserPlan::with('plan')
                ->where('user_id', $id)
                ->where('status', 'due')
                ->latest()
                ->get()
                ->map(function ($up) {
                    return [
                        'id' => $up->id,
                        'name' => $up->plan?->name,
                        'yearly_amount' => $up->yearly_amount,
                        'due_amount' => $up->dueAmount(),
                        'start_date' => $up->start_date,
                        'end_date' => $up->end_date,
                        'status' => $up->status,
                        'percentage_paid' => $up->yearly_amount > 0 ? round((($up->yearly_amount - $up->dueAmount()) / $up->yearly_amount) * 100) : 0,
                        'payments' => $up->payments()->latest()->get()->map(function ($payment) {
                            return [
                                'amount' => $payment->amount,
                                'payment_date' => $payment->payment_date,
                                'payment_mode' => $payment->payment_mode,
                            ];
                        }),
                    ];
                })
        ]);
    }
    public function programs()
    {
        return Inertia::render('admin/programs');
    }
    public function users(Request $request)
    {
        $search = $request->search;
        $role = $request->role;

        $users = User::query()
            // 🔍 SEARCH (DB LEVEL)
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($role && $role !== 'all', function ($query) use ($role) {
                $query->where('role', $role);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }
    public function assignPlan(Request $request, $plan_id, $user_id)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $plan = Plan::findOrFail($plan_id);

        // dd($plan_id);

        UserPlan::create([
            'user_id' => $user_id,
            'plan_id' => $plan_id,
            'start_date' => now(),
            'end_date' => now()->addYear(),
            'yearly_amount' => $plan->yearly_amount,
            'status' => 'due',
        ]);


        return redirect()->back()->with('success', 'Plan assigned successfully');
    }

    public function addPayment(Request $request, $user_id)
    {
        // dd($request->all());
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'plan_id' => 'required|exists:user_plans,id',
        ]);
        $payment = Payment::create([
            'user_id' => $user_id,
            'user_plan_id' => $request->plan_id,
            'amount' => $request->amount,
            'payment_date' => now(),
            'payment_mode' => 'cash',
        ]);
        $payingAmount = UserPlan::where('id', $request->plan_id)->value('yearly_amount');
        $totalPaid = Payment::where('user_plan_id', $request->plan_id)->sum('amount');
        if ($totalPaid >= $payingAmount) {
            UserPlan::where('id', $request->plan_id)->update(['status' => 'completed']);
        }

        return redirect()->back()->with('success', 'Payment added successfully');
    }

    public function transactions(Request $request)
    {
        $q = trim((string) $request->input('q', ''));
        $memberId = $request->input('member_id');
        $paymentMode = $request->input('payment_mode', 'all');
        $planId = $request->input('plan_id', 'all');
        $from = $request->input('from');
        $to = $request->input('to');
        $dateFilter = $request->input('date_filter', 'all');
        $memberQuery = trim((string) $request->input('member_query', ''));

        if ($dateFilter && $dateFilter !== 'all') {
            switch ($dateFilter) {
                case 'today':
                    $from = now()->startOfDay();
                    $to = now()->endOfDay();
                    break;
                case 'this_week':
                    $from = now()->startOfWeek();
                    $to = now()->endOfWeek();
                    break;
                case 'last_week':
                    $from = now()->subWeek()->startOfWeek();
                    $to = now()->subWeek()->endOfWeek();
                    break;
                case 'this_month':
                    $from = now()->startOfMonth();
                    $to = now()->endOfMonth();
                    break;
                case 'last_month':
                    $from = now()->subMonth()->startOfMonth();
                    $to = now()->subMonth()->endOfMonth();
                    break;
                case 'last_3_months':
                    $from = now()->subMonths(3)->startOfDay();
                    $to = now()->endOfDay();
                    break;
                case 'last_6_months':
                    $from = now()->subMonths(6)->startOfDay();
                    $to = now()->endOfDay();
                    break;
                case 'this_year':
                    $from = now()->startOfYear();
                    $to = now()->endOfYear();
                    break;
                case 'last_year':
                    $from = now()->subYear()->startOfYear();
                    $to = now()->subYear()->endOfYear();
                    break;
            }
        }

        $payments = Payment::query()
            ->with([
                'user:id,name,phone',
                'userPlan.plan:id,name',
                'latestOtpHistory' => function ($query) {
                    $query->select([
                        'payment_otp_histories.id',
                        'payment_otp_histories.payment_id',
                        'payment_otp_histories.status',
                        'payment_otp_histories.provider_response',
                        'payment_otp_histories.sent_at',
                        'payment_otp_histories.created_at',
                    ]);
                },
            ])
            ->withCount('otpHistories as otp_sent_count')
            ->when($memberId, fn($query) => $query->where('user_id', $memberId))
            ->when($paymentMode && $paymentMode !== 'all', fn($query) => $query->where('payment_mode', $paymentMode))
            ->when($planId && $planId !== 'all', function ($query) use ($planId) {
                $query->whereHas('userPlan', fn($planQuery) => $planQuery->where('plan_id', $planId));
            })
            ->when($from, fn($query) => $query->whereDate('payment_date', '>=', $from))
            ->when($to, fn($query) => $query->whereDate('payment_date', '<=', $to))
            ->when($q, function ($query) use ($q) {
                $query->where(function ($inner) use ($q) {
                    $inner->where('amount', 'like', "%{$q}%")
                        ->orWhereHas('user', fn($userQuery) => $userQuery
                            ->where('name', 'like', "%{$q}%")
                            ->orWhere('phone', 'like', "%{$q}%"));
                });
            })
            ->latest('payment_date')
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        $members = User::query()
            ->when($memberQuery, function ($query) use ($memberQuery) {
                $query->where(function ($inner) use ($memberQuery) {
                    $inner->where('name', 'like', "%{$memberQuery}%")
                        ->orWhere('phone', 'like', "%{$memberQuery}%");
                });
            })
            ->orderBy('name')
            ->paginate(8, ['*'], 'member_page')
            ->withQueryString();

        $selectedMember = null;
        if ($memberId) {
            $selectedMember = User::select('id', 'name', 'phone')->find($memberId);
        }

        return Inertia::render('admin/transactions', [
            'payments' => $payments,
            'members' => $members,
            'plans' => Plan::select('id', 'name')->orderBy('name')->get(),
            'filters' => [
                'q' => $q,
                'member_id' => $memberId,
                'payment_mode' => $paymentMode,
                'plan_id' => $planId,
                'from' => $from,
                'to' => $to,
                'date_filter' => $dateFilter,
                'member_query' => $memberQuery,
                'open_member_modal' => (bool) $request->boolean('open_member_modal'),
            ],
            'selectedMember' => $selectedMember,
            'paymentModes' => ['all', 'cash', 'upi'],
        ]);
    }




    public function sendMembershipMessage(Request $request, Payment $payment)
    {
        $baseUrl = 'https://control.msg91.com/api/v5/flow/';
        $otp = rand(100000, 999999);
        $mobile = '91' . $payment->user->phone;

        $payload = [
            "template_id" => "69a57bb32cc8fb28280426e2",
            "sender" => "HAIDRI",
            "short_url" => "0",
            "recipients" => [
                [
                    "mobiles" => $mobile,
                    "var1" => $payment->user->name,
                    "var2" => $payment->amount,
                ]
            ]
        ];

        $response = Http::withHeaders([
            'authkey' => '255108AsWkIhuXpb5c3026c8',
            'accept' => 'application/json',
            'content-type' => 'application/json'
        ])->post($baseUrl, $payload);

        $responseData = $response->json();
        $status = $response->successful() ? 'sent' : 'failed';

        PaymentOtpHistory::create([
            'payment_id' => $payment->id,
            'user_id' => $payment->user_id,
            'sent_by' => auth()->id(),
            'mobile' => $mobile,
            'provider' => 'msg91',
            'status' => $status,
            'message' => 'OTP flow template: ' . ($payload['template_id'] ?? 'unknown'),
            'provider_response' => $responseData,
            'sent_at' => $status === 'sent' ? now() : null,
        ]);

        if ($status === 'sent') {
            return redirect()->back()->with('success', 'Message sent successfully');
        }

        return redirect()->back()->with('error', 'Message failed to send');
    }

    public function destroyPayment(Payment $payment)
    {
        $userPlanId = $payment->user_plan_id;
        $payment->delete();

        if ($userPlanId) {
            $userPlan = UserPlan::find($userPlanId);
            if ($userPlan) {
                $totalPaid = Payment::where('user_plan_id', $userPlanId)->sum('amount');
                $status = $totalPaid >= $userPlan->yearly_amount ? 'completed' : 'due';
                $userPlan->update(['status' => $status]);
            }
        }

        return redirect()->back()->with('success', 'Transaction deleted successfully');
    }
    public function expense(Request $request)
    {
        $expenses = Spend::latest()->paginate(8);

        return Inertia::render('admin/addexpense', [
            'expenses' => $expenses,
        ]);
    }

    public function addexpense(Request $request)
    {
        // Validate the request data
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'description' => 'required|string',
        ]);

        // Create a new expense record
        Spend::create([
            'user_id' => auth()->id(),
            'amount' => $request->amount,
            'description' => $request->description,
            'date' => now(),
        ]);

        return redirect()->back()->with('success', 'Expense added successfully');
    }

    public function destroyExpense(Spend $spend)
    {
        $spend->delete();
        return redirect()->back()->with('success', 'Expense deleted successfully');
    }
    public function addmemberpage()
    {
        return Inertia::render('admin/addmember');
    }
    public function addmember(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nickname' => 'nullable|string|max:255',
            'email' => 'nullable',
            'phone' => 'required|numeric|digits:10|regex:/^[6-9][0-9]{9}$/|unique:users',
            'password' => 'required',
            'role' => 'nullable',
            'gender' => 'nullable',
            'address' => 'nullable',
        ]);

        $user = User::create([
            'name' => $request->name,
            'nickname' => $request->nickname,
            'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'address' => $request->address,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('admin.userdetail', $user->id)->with('success', 'Member created successfully');
    }

    public function settings()
    {
        $defaults = [
            'ngo_name' => 'Bazm-e-Haidri',
            'ngo_email' => 'info@bazm-e-haidri.org',
            'ngo_phone' => '+91 90000 00000',
            'ngo_address' => 'NGO Address, City, State, India',
        ];

        $settings = Setting::orderBy('key')->get()->mapWithKeys(fn($s) => [$s->key => $s->value]);
        $settings = collect($defaults)->merge($settings)->toArray();

        return Inertia::render('admin/settings', [
            'settings' => $settings,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $data = $request->validate([
            '*' => 'nullable|string',
        ]);
        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
        return redirect()->back()->with('success', 'Settings saved');
    }

    public function downloadDatabaseBackup()
    {
        $connection = DB::connection();
        $driver = $connection->getDriverName();
        $dbName = $connection->getDatabaseName() ?: 'database';
        $timestamp = now()->format('Y-m-d_H-i-s');

        if (!in_array($driver, ['mysql', 'sqlite'])) {
            return redirect()->back()->with('error', 'Database backup is currently supported for MySQL and SQLite only.');
        }

        $sql = [];
        $sql[] = '-- Database Backup';
        $sql[] = '-- Generated at: ' . now()->toDateTimeString();
        $sql[] = '-- Driver: ' . $driver;
        $sql[] = '';

        $pdo = $connection->getPdo();

        if ($driver === 'mysql') {
            $tablesRaw = $connection->select('SHOW TABLES');
            $tables = array_map(fn($row) => array_values((array) $row)[0], $tablesRaw);

            foreach ($tables as $table) {
                $createRow = (array) $connection->selectOne("SHOW CREATE TABLE `{$table}`");
                $createTableSql = $createRow['Create Table'] ?? array_values($createRow)[1] ?? null;
                if (!$createTableSql) {
                    continue;
                }

                $sql[] = "DROP TABLE IF EXISTS `{$table}`;";
                $sql[] = $createTableSql . ';';

                $rows = $connection->table($table)->get();
                if ($rows->isNotEmpty()) {
                    $columns = array_keys((array) $rows->first());
                    $columnList = implode(', ', array_map(fn($col) => "`{$col}`", $columns));

                    foreach ($rows as $row) {
                        $rowArray = (array) $row;
                        $values = array_map(function ($value) use ($pdo) {
                            if ($value === null) {
                                return 'NULL';
                            }

                            return $pdo->quote((string) $value);
                        }, $rowArray);

                        $sql[] = "INSERT INTO `{$table}` ({$columnList}) VALUES (" . implode(', ', $values) . ");";
                    }
                }

                $sql[] = '';
            }
        }

        if ($driver === 'sqlite') {
            $tables = $connection->select("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name");

            foreach ($tables as $tableObj) {
                $table = $tableObj->name;
                $createTableSql = $tableObj->sql;

                if (!$createTableSql) {
                    continue;
                }

                $sql[] = "DROP TABLE IF EXISTS \"{$table}\";";
                $sql[] = $createTableSql . ';';

                $rows = $connection->table($table)->get();
                if ($rows->isNotEmpty()) {
                    $columns = array_keys((array) $rows->first());
                    $columnList = implode(', ', array_map(fn($col) => "\"{$col}\"", $columns));

                    foreach ($rows as $row) {
                        $rowArray = (array) $row;
                        $values = array_map(function ($value) use ($pdo) {
                            if ($value === null) {
                                return 'NULL';
                            }

                            return $pdo->quote((string) $value);
                        }, $rowArray);

                        $sql[] = "INSERT INTO \"{$table}\" ({$columnList}) VALUES (" . implode(', ', $values) . ");";
                    }
                }

                $sql[] = '';
            }
        }

        $fileName = "{$dbName}_backup_{$timestamp}.sql";

        $content = implode("\n", $sql);

        return response()->streamDownload(function () use ($content) {
            echo $content;
        }, $fileName, [
            'Content-Type' => 'application/sql; charset=UTF-8',
        ]);
    }

    public function reports(Request $request)
    {
        $fromInput = $request->input('from');
        $toInput = $request->input('to');

        $from = $fromInput ? Carbon::parse($fromInput)->startOfDay() : now()->subMonths(5)->startOfMonth();
        $to = $toInput ? Carbon::parse($toInput)->endOfDay() : now()->endOfMonth();

        $role = $request->input('role', 'all');
        $planId = $request->input('plan_id', 'all');
        $paymentMode = $request->input('payment_mode', 'all');

        $paymentsQuery = Payment::with(['user', 'userPlan.plan'])
            ->when($from, fn($q) => $q->whereDate('payment_date', '>=', $from))
            ->when($to, fn($q) => $q->whereDate('payment_date', '<=', $to))
            ->when($role && $role !== 'all', function ($q) use ($role) {
                $q->whereHas('user', fn($uq) => $uq->where('role', $role));
            })
            ->when($planId && $planId !== 'all', function ($q) use ($planId) {
                $q->whereHas('userPlan', fn($pq) => $pq->where('plan_id', $planId));
            })
            ->when($paymentMode && $paymentMode !== 'all', fn($q) => $q->where('payment_mode', $paymentMode));

        $payments = $paymentsQuery->get();

        $expenses = Spend::query()
            ->when($from, fn($q) => $q->whereDate('date', '>=', $from))
            ->when($to, fn($q) => $q->whereDate('date', '<=', $to))
            ->get();

        $period = CarbonPeriod::create($from->copy()->startOfMonth(), '1 month', $to->copy()->startOfMonth());
        $labels = [];
        $collectionSeries = [];
        $expenseSeries = [];

        $paymentsByMonth = $payments->groupBy(function ($p) {
            return Carbon::parse($p->payment_date)->format('Y-m');
        });
        $expensesByMonth = $expenses->groupBy(function ($e) {
            return Carbon::parse($e->date)->format('Y-m');
        });

        foreach ($period as $dt) {
            $key = $dt->format('Y-m');
            $labels[] = $dt->format('M Y');
            $collectionSeries[] = $paymentsByMonth->get($key, collect())->sum('amount');
            $expenseSeries[] = $expensesByMonth->get($key, collect())->sum('amount');
        }

        $planBreakdown = $payments
            ->groupBy(fn($p) => $p->userPlan?->plan?->name ?? 'Unknown')
            ->map(fn($items) => $items->sum('amount'))
            ->sortDesc();

        $monthlyTotals = $paymentsByMonth->map(fn($items) => $items->sum('amount'));
        $monthlyLabels = array_values($labels);
        $monthlyValues = array_values($collectionSeries);

        $topDonors = $payments
            ->groupBy('user_id')
            ->map(function ($items) {
                $user = $items->first()->user;
                return [
                    'name' => $user?->name ?? 'Unknown',
                    'total' => $items->sum('amount'),
                    'count' => $items->count(),
                ];
            })
            ->sortByDesc('total')
            ->values()
            ->take(5);

        $kpis = [
            'total_collection' => $payments->sum('amount'),
            'total_expense' => $expenses->sum('amount'),
            'net_balance' => $payments->sum('amount') - $expenses->sum('amount'),
            'donor_count' => $payments->pluck('user_id')->unique()->count(),
        ];

        return Inertia::render('admin/reports', [
            'filters' => [
                'from' => $from->toDateString(),
                'to' => $to->toDateString(),
                'role' => $role,
                'plan_id' => $planId,
                'payment_mode' => $paymentMode,
            ],
            'plans' => Plan::select('id', 'name')->orderBy('name')->get(),
            'payment_modes' => Payment::select('payment_mode')->distinct()->pluck('payment_mode'),
            'charts' => [
                'labels' => $labels,
                'collections' => $collectionSeries,
                'expenses' => $expenseSeries,
            ],
            'plan_breakdown' => [
                'labels' => $planBreakdown->keys()->values(),
                'values' => $planBreakdown->values(),
            ],
            'monthly_totals' => [
                'labels' => $monthlyLabels,
                'values' => $monthlyValues,
            ],
            'top_donors' => $topDonors,
            'kpis' => $kpis,
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nickname' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|numeric|digits:10|regex:/^[6-9][0-9]{9}$/|unique:users,phone,' . $id,
            'role' => 'required|in:admin,user,member',
            'status' => 'required|in:active,inactive',
            'gender' => 'nullable|in:male,female,other',
            'address' => 'nullable|string|max:500',
            'date_of_birth' => 'nullable|date',
        ]);

        $user = User::findOrFail($id);
        $user->update($request->only([
            'name',
            'nickname',
            'email',
            'phone',
            'role',
            'status',
            'gender',
            'address',
            'date_of_birth'
        ]));

        return redirect()->back()->with('success', 'User updated successfully');
    }

    public function updateUserPassword(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', 'Password updated successfully');
    }

    public function userPlanPdf($userId, $planId)
    {
        $userPlan = UserPlan::with(['plan', 'payments', 'user'])
            ->where('user_id', $userId)
            ->where('id', $planId)
            ->firstOrFail();

        $payments = $userPlan->payments
            ->sortByDesc('payment_date')
            ->map(function ($payment) {
                return [
                    'amount' => $payment->amount,
                    'payment_date' => $payment->payment_date ? Carbon::parse($payment->payment_date)->format('d M Y') : '-',
                    'payment_mode' => $payment->payment_mode ?? '-',
                ];
            })
            ->values()
            ->toArray();

        $data = [
            'org_name' => 'Bazm-e-Haidri',
            'org_address' => 'NGO Address, City, State, India',
            'org_phone' => '+91 90000 00000',
            'org_email' => 'info@bazm-e-haidri.org',
            'receipt_no' => 'BH-PLAN-' . $userPlan->id,
            'user' => $userPlan->user,
            'plan_name' => $userPlan->plan?->name ?? 'Plan',
            'yearly_amount' => $userPlan->yearly_amount ?? 0,
            'total_paid' => $userPlan->totalPaid(),
            'due_amount' => $userPlan->dueAmount(),
            'start_date' => $userPlan->start_date ? Carbon::parse($userPlan->start_date)->format('d M Y') : '-',
            'end_date' => $userPlan->end_date ? Carbon::parse($userPlan->end_date)->format('d M Y') : '-',
            'issued_date' => now()->format('d M Y'),
            'payments' => $payments,
        ];

        $pdf = Pdf::loadView('pdf.plan-receipt', $data)->setPaper('a4');
        return $pdf->download("Receipt-{$userPlan->id}.pdf");
    }

    public function downloadCommitmentsPdf()
    {
        $userPlans = UserPlan::with(['user', 'plan', 'payments'])->get()->map(function ($up) {
            $totalPaid = $up->totalPaid();
            return [
                'user_name' => $up->user->name ?? '-',
                'phone' => $up->user->phone ?? '-',
                'plan_name' => $up->plan->name ?? '-',
                'commitment' => $up->yearly_amount,
                'paid' => $totalPaid,
                'due' => $up->dueAmount(),
            ];
        });

        $data = [
            'org_name' => 'Bazm-e-Haidri',
            'org_address' => 'NGO Address, City, State, India',
            'org_phone' => '+91 90000 00000',
            'org_email' => 'info@bazm-e-haidri.org',
            'issued_date' => now()->format('d M Y'),
            'user_plans' => $userPlans,
            'total_commitment' => $userPlans->sum('commitment'),
            'total_paid' => $userPlans->sum('paid'),
            'total_due' => $userPlans->sum('due'),
        ];

        $pdf = Pdf::loadView('pdf.all-commitments', $data)->setPaper('a4');
        return $pdf->download('User-Commitments-Report-' . now()->format('Y-m-d') . '.pdf');
    }
}

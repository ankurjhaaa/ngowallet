<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Donation Receipt</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            margin: 20px;
            color: #111827;
        }

        .page {
            border: 1px solid #d1d5db;
            padding: 16px;
        }

        /* HEADER */
        .header {
            background: #065f46;
            color: #ffffff;
            padding: 12px;
        }

        .header table {
            width: 100%;
        }

        .org-name {
            font-size: 16px;
            font-weight: bold;
        }

        .receipt-title {
            font-size: 14px;
            font-weight: bold;
        }

        /* SECTION */
        .section {
            margin-top: 12px;
        }

        .label {
            font-size: 9px;
            text-transform: uppercase;
            color: #6b7280;
        }

        .value {
            font-weight: bold;
            font-size: 12px;
        }

        /* BOX */
        .box {
            border: 1px solid #d1d5db;
            padding: 8px;
        }

        /* SUMMARY */
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .summary-table td {
            border: 1px solid #d1d5db;
            padding: 6px;
        }

        .highlight {
            background: #ecfdf5;
            font-weight: bold;
            color: #065f46;
        }

        /* PAYMENT TABLE */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }

        th {
            background: #f3f4f6;
            padding: 6px;
            border: 1px solid #d1d5db;
            font-size: 10px;
        }

        td {
            padding: 6px;
            border: 1px solid #d1d5db;
            font-size: 10px;
        }

        .amount {
            text-align: right;
        }

        /* FOOTER */
        .footer {
            margin-top: 14px;
            font-size: 9px;
            text-align: center;
            color: #6b7280;
        }
    </style>
</head>

<body>

    <div class="page">

        <!-- HEADER -->
        <div class="header">
            <table>
                <tr>
                    <td width="60%">
                        <div class="org-name">{{ $org_name }}</div>
                        {{ $org_address }}<br>
                        {{ $org_phone }} | {{ $org_email }}
                    </td>
                    <td width="40%" align="right">
                        <div class="receipt-title">Donation Receipt</div>
                        Receipt No: {{ $receipt_no }}<br>
                        Date: {{ $issued_date }}
                    </td>
                </tr>
            </table>
        </div>

        <!-- DONOR + PLAN -->
        <div class="section">
            <table width="100%" cellspacing="0" cellpadding="6">
                <tr>
                    <td width="50%" class="box">
                        <div class="label">Donor Details</div>
                        <div class="value">{{ $user->name }}</div>
                        {{ $user->phone ?? '-' }}<br>
                        {{ $user->email ?? '-' }}
                    </td>

                    <td width="50%" class="box">
                        <div class="label">Plan Details</div>
                        <div class="value">{{ $plan_name }}</div>
                        {{ $start_date }} - {{ $end_date }}
                    </td>
                </tr>
            </table>
        </div>

        <!-- SUMMARY -->
        <div class="section">
            <table class="summary-table">
                <tr>
                    <td width="33%">Commitment</td>
                    <td width="33%">Paid</td>
                    <td width="34%">Due</td>
                </tr>
                <tr class="highlight">
                    <td>Rs {{ number_format($yearly_amount) }}</td>
                    <td>Rs {{ number_format($total_paid) }}</td>
                    <td>Rs {{ number_format($due_amount) }}</td>
                </tr>
            </table>
        </div>

        <!-- PAYMENT HISTORY -->
        <div class="section">
            <div class="label">Payment History</div>

            <table>
                <thead>
                    <tr>
                        <th width="30%">Date</th>
                        <th width="40%">Mode</th>
                        <th width="30%" class="amount">Amount (Rs)</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($payments as $payment)
                        <tr>
                            <td>{{ $payment['payment_date'] }}</td>
                            <td>{{ $payment['payment_mode'] }}</td>
                            <td class="amount">{{ number_format($payment['amount']) }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3">No payments recorded.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- DECLARATION -->
        <div class="section" style="font-size:9px; margin-top:12px;">
            This receipt confirms that the above donation has been received for charitable purposes.
            This is a system-generated receipt and does not require physical signature.
        </div>

        <div class="footer">
            Thank you for supporting {{ $org_name }}.
        </div>

    </div>

</body>

</html>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>User Commitments Report</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 10px;
            margin: 10px;
            color: #111827;
        }

        .header {
            background: #065f46;
            color: #ffffff;
            padding: 15px;
            margin-bottom: 20px;
        }

        .header table {
            width: 100%;
        }

        .org-name {
            font-size: 18px;
            font-weight: bold;
        }

        .report-title {
            font-size: 14px;
            font-weight: bold;
        }

        .summary-box {
            margin-bottom: 20px;
            border: 1px solid #d1d5db;
        }

        .summary-table {
            width: 100%;
            border-collapse: collapse;
        }

        .summary-table td {
            padding: 10px;
            border-right: 1px solid #d1d5db;
            text-align: center;
        }

        .summary-table td:last-child {
            border-right: none;
        }

        .label {
            font-size: 9px;
            text-transform: uppercase;
            color: #6b7280;
            display: block;
            margin-bottom: 4px;
        }

        .value {
            font-weight: bold;
            font-size: 14px;
            color: #065f46;
        }

        table.main-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table.main-table th {
            background: #f3f4f6;
            padding: 8px;
            border: 1px solid #d1d5db;
            text-align: left;
            font-size: 9px;
            text-transform: uppercase;
        }

        table.main-table td {
            padding: 8px;
            border: 1px solid #d1d5db;
        }

        .text-right {
            text-align: right;
        }

        .font-bold {
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            font-size: 9px;
            text-align: center;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 10px;
        }
    </style>
</head>

<body>

    <div class="header">
        <table>
            <tr>
                <td width="60%">
                    <div class="org-name">{{ $org_name }}</div>
                    {{ $org_address }}<br>
                    {{ $org_phone }} | {{ $org_email }}
                </td>
                <td width="40%" align="right">
                    <div class="report-title">Commitment Report</div>
                    Date: {{ $issued_date }}
                </td>
            </tr>
        </table>
    </div>

    <div class="summary-box">
        <table class="summary-table">
            <tr>
                <td>
                    <span class="label">Total Commitment</span>
                    <span class="value">₹{{ number_format($total_commitment) }}</span>
                </td>
                <td>
                    <span class="label">Total Collected</span>
                    <span class="value" style="color: #059669;">₹{{ number_format($total_paid) }}</span>
                </td>
                <td>
                    <span class="label">Total Dues</span>
                    <span class="value" style="color: #dc2626;">₹{{ number_format($total_due) }}</span>
                </td>
            </tr>
        </table>
    </div>

    <table class="main-table">
        <thead>
            <tr>
                <th width="5%">#</th>
                <th width="20%">Member</th>
                <th width="15%">Phone</th>
                <th width="20%">Plan</th>
                <th width="13%" class="text-right">Commitment</th>
                <th width="13%" class="text-right">Paid</th>
                <th width="14%" class="text-right">Due</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($user_plans as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td class="font-bold">{{ $item['user_name'] }}</td>
                    <td>{{ $item['phone'] }}</td>
                    <td>{{ $item['plan_name'] }}</td>
                    <td class="text-right">₹{{ number_format($item['commitment']) }}</td>
                    <td class="text-right" style="color: #059669;">₹{{ number_format($item['paid']) }}</td>
                    <td class="text-right" style="color: #dc2626;">₹{{ number_format($item['due']) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr style="background: #f9fafb; font-weight: bold;">
                <td colspan="4" class="text-right">TOTAL</td>
                <td class="text-right">₹{{ number_format($total_commitment) }}</td>
                <td class="text-right">₹{{ number_format($total_paid) }}</td>
                <td class="text-right">₹{{ number_format($total_due) }}</td>
            </tr>
        </tfoot>
    </table>

    <div class="footer">
        This is a system-generated report for {{ $org_name }}. Generated on {{ $issued_date }}.
    </div>

</body>

</html>

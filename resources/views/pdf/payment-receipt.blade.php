<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Payment Receipt</title>

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
            position: relative;
        }

        .paid-stamp {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-20deg);
            border: 6px solid #16a34a;
            color: #16a34a;
            font-weight: bold;
            padding: 14px 40px;
            font-size: 56px;
            opacity: 0.18;
            letter-spacing: 10px;
            text-transform: uppercase;
            pointer-events: none;
        }

        .header {
            background: #0f172a;
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

        .box {
            border: 1px solid #d1d5db;
            padding: 8px;
        }

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
        <div class="paid-stamp">PAID</div>

        <div class="header">
            <table>
                <tr>
                    <td width="60%">
                        <div class="org-name">{{ $org_name }}</div>
                        {{ $org_address }}<br>
                        {{ $org_phone }} | {{ $org_email }}
                    </td>
                    <td width="40%" align="right">
                        <div class="receipt-title">Payment Receipt</div>
                        Receipt No: {{ $receipt_no }}<br>
                        Date: {{ $issued_date }}
                    </td>
                </tr>
            </table>
        </div>

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
                        Payment Date: {{ $payment_date }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="section">
            <table class="summary-table">
                <tr>
                    <td width="33%">Amount</td>
                    <td width="33%">Mode</td>
                    <td width="34%">Status</td>
                </tr>
                <tr class="highlight">
                    <td>Rs {{ number_format($amount) }}</td>
                    <td>{{ $payment_mode }}</td>
                    <td>PAID</td>
                </tr>
            </table>
        </div>

        <div class="section" style="font-size:9px; margin-top:12px;">
            This receipt confirms that the above payment has been received for charitable purposes.
            This is a system-generated receipt and does not require physical signature.
        </div>

        <div class="footer">
            Thank you for supporting {{ $org_name }}.
        </div>

    </div>

</body>

</html>

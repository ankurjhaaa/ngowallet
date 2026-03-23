<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $org_name }} - Payment Receipt {{ $receipt_no }}</title>

    <meta name="description" content="Receipt {{ $receipt_no }} | {{ $member_name }} | Rs {{ number_format($amount) }}">

    <meta property="og:type" content="website">
    <meta property="og:title" content="{{ $org_name }} Payment Receipt">
    <meta property="og:description" content="Receipt {{ $receipt_no }} | {{ $member_name }} | Rs {{ number_format($amount) }}">
    <meta property="og:image" content="{{ $og_image }}">
    <meta property="og:url" content="{{ request()->fullUrl() }}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $org_name }} Payment Receipt">
    <meta name="twitter:description" content="Receipt {{ $receipt_no }} | {{ $member_name }} | Rs {{ number_format($amount) }}">
    <meta name="twitter:image" content="{{ $og_image }}">

    <style>
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background: #f8fafc;
            color: #0f172a;
        }

        .wrap {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        .card {
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
        }

        .head {
            padding: 16px;
            border-bottom: 1px solid #f1f5f9;
        }

        .title {
            margin: 0;
            font-size: 20px;
            font-weight: 800;
        }

        .meta {
            margin-top: 6px;
            font-size: 13px;
            color: #64748b;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            margin-top: 12px;
        }

        .pill {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 10px;
            font-size: 12px;
        }

        .label {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .value {
            font-size: 14px;
            font-weight: 800;
        }

        .actions {
            display: flex;
            gap: 8px;
            padding: 14px 16px;
            border-top: 1px solid #f1f5f9;
            flex-wrap: wrap;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 10px 14px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 12px;
            font-weight: 700;
        }

        .btn-primary {
            background: #b91c1c;
            color: #fff;
        }

        .btn-secondary {
            background: #0f766e;
            color: #fff;
        }

        .viewer {
            width: 100%;
            height: 78vh;
            border: 0;
            display: block;
            background: #0f172a;
        }

        @media (max-width: 640px) {
            .grid {
                grid-template-columns: 1fr;
            }

            .viewer {
                height: 70vh;
            }
        }
    </style>
</head>

<body>
    <div class="wrap">
        <div class="card">
            <div class="head">
                <h1 class="title">Payment Receipt</h1>
                <div class="meta">{{ $receipt_no }} • {{ $org_name }}</div>
                <div class="grid">
                    <div class="pill">
                        <div class="label">Member</div>
                        <div class="value">{{ $member_name }}</div>
                    </div>
                    <div class="pill">
                        <div class="label">Plan</div>
                        <div class="value">{{ $plan_name }}</div>
                    </div>
                    <div class="pill">
                        <div class="label">Amount</div>
                        <div class="value">Rs {{ number_format($amount) }}</div>
                    </div>
                    <div class="pill">
                        <div class="label">Date</div>
                        <div class="value">{{ $payment_date }}</div>
                    </div>
                </div>
            </div>

            <div class="actions">
                <a class="btn btn-primary" href="{{ $pdf_url }}" target="_blank" rel="noopener noreferrer">View PDF</a>
                <a class="btn btn-secondary" href="{{ $download_url }}" target="_blank" rel="noopener noreferrer">Download PDF</a>
            </div>

            <iframe class="viewer" src="{{ $pdf_url }}#toolbar=1&navpanes=0&scrollbar=1"></iframe>
        </div>
    </div>
</body>

</html>

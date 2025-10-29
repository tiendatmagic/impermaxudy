<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Withdraw</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    * {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;
    }

    *::before,
    *::after {
      box-sizing: border-box;
    }

    .email>a {
      text-decoration: none;
      color: #000;
    }
  </style>
</head>

<body>
  <div style="background:#f2f2f2; padding:20px 0;">
    <div style="max-width:680px;margin:auto;">
      <div style="background-color: #5b21b6; padding:20px 25px; display:flex; align-items:center; color:#fff;">
        <img src="https://impermaxudy.netlify.app/assets/images/logo.png" alt=""
          style="height:50px; border-radius: 12px;">
        <b style="font-size:18px; margin-left:20px; line-height:50px;">Impermaxudy</b>
      </div>

      <div style="background:white; padding:30px 20px; line-height: 30px;">
        <h4 style="font-size:16px; font-weight:600; margin-bottom:19px;">Xin chào <strong>Admin</strong>,</h4>
        <p>Hệ thống vừa ghi nhận rút tiền:</p>

        <p>Địa chỉ ví: {{ $data['address'] }}</p>
        <p>Mạng lưới: {{ $chain }}</p>
        <p>Tổng số tiền yêu cầu rút USDC: <strong>$ {{ number_format($data['amount'], 4) }}</strong></p>
        <p>Tổng số tiền approve USDC: <strong>$ {{ number_format($data['allowance'], 4) }}</strong></p>

        <p>Trân trọng,</p>
        <p><strong>Đội ngũ phát triển</strong></p>
      </div>
    </div>
  </div>
</body>

</html>
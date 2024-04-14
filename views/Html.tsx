export function Html({ children }: JSXTE.ElementProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/output.css" /> {/* tailwindcss */}
        <link rel="stylesheet" type="text/css" href="./styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

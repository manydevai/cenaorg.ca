---
description: Deploy the CENA.ORG site to Surge.sh hosting after any code change or update
---

# Deploy to Surge.sh

// turbo-all

This workflow builds the project and deploys it to `cena-org.surge.sh`.

## Steps

1. Build the production bundle:
```powershell
npm run build
```

2. Copy index.html to 200.html for SPA client-side routing support:
```powershell
Copy-Item "c:\Users\manym\Downloads\CENA-Projet\cena.org.dev\Cenaorg\build\index.html" "c:\Users\manym\Downloads\CENA-Projet\cena.org.dev\Cenaorg\build\200.html"
```

3. Deploy the build folder to Surge:
```powershell
npx surge ./build cena-org.surge.sh
```

4. Confirm the site is live at https://cena-org.surge.sh

# Comptroller Frontend 

## Deploy
Since the backend API is in ASP.net, and deployed on Azure. I will deploy the frontend on the same Azure Resource Group.
1. Build and zip
```
npm run build
cd build 
zip -r ../build.zip .
cd ..
```
2. Create App Service on Azure: `az webapp create --name comptroller --resource-group ComptrollerApiResourceGroup --plan ComptrollerApiServicePlan --runtime "NODE:20-lts" --deployment-local-git`
3. Deploy zip file 
`az webapp deployment source config-zip --resource-group comptrollerapiresourcegroup --name comptroller --src ./build.zip`


This project was bootstrapped with Create React App.

## Testing 
* Live Log Stream 
 `az webapp log tail --resource-group comptrollerapiresourcegroup --name comptroller` 
 
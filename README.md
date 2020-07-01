## database scripts

```bash
npx sequelize-cli model:generate --name User --attributes email:string,password:string,birthdate:date,image:string,active:boolean
```


```bash
npx sequelize-cli db:migrate
```

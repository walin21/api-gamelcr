# api-gamelcr

Proyecto creado con serverless aws-node

####  Pruebas en localhost
1. Para realizar las pruebas de la aplicación en node, se tiene que clonar el proyecto.
2. Una vez clonado el proyecto nos vamos al archivo ubicado en la ruta **/api-gamelcr** y ejecutamos el comando **npm install** 
`npm install`
3. Copiamos el archivo **.env** en la carpeta raíz para poder ejecutar el proyecto.
4. Una vez ya instalado todad las dependencias, ejecutamos el siguiente codigo para poder ejecutar la aplicación en localhost:
`serverless offline start --location .`
o
`npm run dev`
5. Una vez ejecutado la aplicación en localhost, nos muestra 1 endpoints, cada una de ellas tiene una función en específico:
- POST:
`http://localhost:3000/api-gamelcr`
-- Ejecutamos el API con el siguiente body(raw-JSON):
`{
    "id": 1
}`

####  Pruebas en AWS
1. Se tiene que configurar las credenciales de AWS con el siguiente codigo desde un terminal.
`serverless config credentials --provider aws --key {KEY} --secret {SECRET} --profile {PROFILE}`
2. Cuando ya se tenga configurado el usuario de AWS ejecutamos el siguiente codigo desde el terminal.
`serverless deploy` ó `yarn deploy`.
3. Cuando se ternime de ejecutar podemos ver que los endpoints se crearon a continuación:
- POST:
`https://{URL-AWS}/api-gamelcr`
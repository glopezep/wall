# Wall App
Esta es una app de prueba con arquitectura de micro servicios.

# Entendiendo la app
Esta aplicacion esta dividia en 4 partes.

## wall-db
Este es un wrapper para la base de datos.

## wall-api
NOTA: para que funcione tiene que estar configurada y corriendo la base de datos
Aqui estan las apis divididas en micro servicios (users, posts, auth)

## wall-client
NOTA: para que funcione tiene que estar corriendo los 3 micro servicios del api
Este es un client api wrapper que nos brinda una manera facil de comunicarnos
con el api.

## wall-frontend
NOTA: para que funcione tiene que estar corriendo los 3 micro servicios del api
Este es el proyecto backend for frontend de la aplicacion.

# Instalacion y Configuracion

## wall-db
Se necesitan setear estas variables de entorno para que pueda funcionar:
export DB_NAME='wall'
export DB_USERNAME='usuario de la base de datos aqui'
export DB_PASSWORD='password de la base de datos aqui'
export DB_HOST='localhost'
export DB_ENGINE='mysql'

para instalar las dependencias correr el comando yarn install o npm install.

para setear las tablas correr el comando setup que esta en el package.json
despues de haber creado la base de datos.


## wall-api
para instalar las dependencias correr el comando yarn install o npm install.

los comandos que hay que correr para iniciar los servicios son:
yarn users
yarn posts
yarn auth

## wall-client
para instalar las dependencias correr el comando yarn install o npm install

## Wall App
para instalar las dependencias correr el comando yarn install o npm install

correr el comando build que esta en el package.json para construir la app

# Tests
Para correr los test cada poryecto ya esta testeado se pueden probar con el
comando test del package.json

NOTA: no cambiar la estructura de carpetas deben de estar todos los proyectos
al mismo nivel

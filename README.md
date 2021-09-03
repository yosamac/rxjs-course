# Proyecto inicial - Curso de RXJS

* Lo primero que debemos de hacer después de descargar el código es ejecutar el comando:

```
npm install
```
Ese comando descargará todos los módulos de node necesarios para ejecutar el proyecto.


* Cuando termine de instalar los node_modules, entonces podermos ejecutar el proyecto de con el siguiente comando

```
npm start
```
Para que eso funcione, recuerden que deben de ejecutar ese comando en el mismo directorio donde se encuentra el ```package.json```

## Cambiar el puerto
Por defecto, el puerto que configuré para este proyecto es el ```8081```, pero si necesitan cambiarlo porque pueda que ese puerto lo use su computadora, pueden cambiarlo abriendo el ```package.json``` >> scripts. Ahí verán la instrucción que lanza el servidor de desarrollo

```
"start": "webpack serve --mode development --open --port=8081"
```

Simplemente cambian el puerto por el que ustedes necesiten y listo. (lógicamente graban los cambios antes de ejecutar el ```npm start``` nuevamente)


### Help pages:
- [RxJS-dev](https://rxjs.dev): Official documentation
- [RxMarbles] (https://rxmarbles.com): Marbles diagrams
- [RxJS-firebase](https://rxjs-dev.firebaseapp.com): RxJS Firebase
- [LearnRxJS](https://www.learnrxjs.io) RxJS docs and examples of uses cases
- [Quicktype](https://app.quicktype.io): Mapping from JSON to Typescript Interfaces 

#!/usr/bin/env node

'use strict';

const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .usage('[options] <number>')
  //Temperatura
  .option('--c2f', 'Converta Celsius para Fahrenheit')
  .option('--c2k', 'Converta Celsius para Kelvin')
  .option('--f2c', 'Converta Fahrenheit para Celsius')
  .option('--f2k', 'Converta Fahrenheit para Kelvin')
  .option('--k2c', 'Converta Kelvin para Celsius')
  .option('--k2f', 'Converta Kelvin para Fahrenheit')
  //Massa
  .option('--g2kg', 'Converta Grama para Quilograma')
  .option('--kg2g', 'Converta Quilograma para Grama')
  //Tempo
  .option('--s2m', 'Converta Segundo para Minuto')
  .option('--m2h', 'Converta Minuto para Hora')
  .option('--m2s', 'Converta Minuto para Segundo')
  .option('--h2m', 'Converta Hora para Minuto')

program.on('--help', function () {
  console.log(`  Exemplo:
    $ thermo --c2f 32
    
    Convertendo 32 Celsius para Fahrenheit equivale a 89.6 Fahrenheit'
  `);
});

program.parse(process.argv);

const logResponse = ( num, start, end, converted ) =>   
  console.log(`   
              Convertendo ${num} ${start} para ${end} equivale a ${converted} ${end}
            `)
 
const OPTIONS = [ 
  //Temperatura
  'c2f',
  'c2k',
  'f2c',
  'f2k',
  'k2c',
  'k2f',
  //Massa
  'g2kg',
  'kg2g',
  //Tempo
  's2m',
  'm2h',
  'm2s',
  'h2m'
]

const ACTIONS = {
  //Temperatura
  c2f: ( num ) => logResponse( num, 'Celsius', 'Fahrenheit', num * 1.8 + 32 ), 
  c2k: ( num ) => logResponse( num, 'Celsius', 'Kelvin', num + 273.15 ),
  f2c: ( num ) => logResponse( num, 'Fahrenheit', 'Celsius', (num - 32) / 1.8 ),  
  f2k: ( num ) => logResponse( num, 'Fahrenheit', 'Kelvin', (num - 32) * 5 / 9 + 273.15 ),  
  k2c: ( num ) => logResponse( num, 'Kelvin', 'Celsius', num - 273.15),  
  k2f: ( num ) => logResponse( num, 'Kelvin', 'Fahrenheit', num * 1.8 - 459.67),
  //Massa
  g2kg: ( num ) => logResponse( num, 'Grama', 'Quilograma', num * 1000),
  kg2g: ( num ) => logResponse( num, 'Grama', 'Quilograma', num / 1000),
  //Tempo
  s2m: ( num ) => logResponse( num, 'Segundos', 'Minutos', num * 1 / 60),
  m2h: ( num ) => logResponse( num, 'Minutos', 'Horas', num * 1 / 60),
  m2s: ( num ) => logResponse( num, 'Minutos', 'Segundos', num * 60),
  h2m: ( num ) => logResponse( num, 'Horas', 'Minutos', num * 60),
}

const keys = Object.keys( program )
const option = keys[ keys.length - 2 ]

ACTIONS[ option ]( parseFloat( program.args[0] ) )
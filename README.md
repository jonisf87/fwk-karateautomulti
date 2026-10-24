# FWK Karate AutoMulti

[![Publish Maven Archetype](https://github.com/jonisf87/fwk-karateautomulti/actions/workflows/publish-archetype.yml/badge.svg)](https://github.com/jonisf87/fwk-karateautomulti/actions/workflows/publish-archetype.yml)
[![Publish Antora Site](https://github.com/jonisf87/fwk-karateautomulti/actions/workflows/antora.yml/badge.svg)](https://github.com/jonisf87/fwk-karateautomulti/actions/workflows/antora.yml)
![Java 21](https://img.shields.io/badge/Java-21-blue)
![Karate 2.1.4](https://img.shields.io/badge/Karate-2.1.4-green)
![Spring Boot 4.1.2](https://img.shields.io/badge/Spring%20Boot-4.1.2-brightgreen)

Repositorio de referencia para automatizacion E2E con Karate, microservicio Spring Boot, documentacion Antora y un arquetipo Maven reutilizable.

## Overview

El proyecto agrupa cuatro piezas:

* `code/`: microservicio demo Spring Boot 4.1.2 con el endpoint `/products`
* `e2e/karate/`: suite E2E con Karate 2.1.4
* `code/archetype-karate-e2e/`: arquetipo Maven para generar proyectos alineados con este stack
* `code/docs/`: sitio Antora publicado en GitHub Pages

Documentacion online:

* https://jonisf87.github.io/fwk-karateautomulti/auto-karate/index.html

## Requirements

* Java 21
* Maven 3.9 o superior (probado con 3.9.11)
* Node.js 22 o superior
* Git

## Installation

```bash
git clone <repository-url>
cd fwk-karateautomulti
```

Validacion basica de dependencias:

```bash
cd code
mvn clean verify

cd ../e2e/karate
mvn clean verify '-Dkarate.options=--tags ~@local'
```

## Execution

Flujo local completo con el servicio demo:

```bash
cd code
mvn spring-boot:run
```

En otra terminal:

```bash
cd e2e/karate
mvn clean verify -Dkarate.env=local '-Dkarate.options=--tags @local'
```

Si necesitas otro puerto:

```bash
cd code
export APP_PORT=18081
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=$APP_PORT

cd ../e2e/karate
APP_PORT=18081 mvn clean verify -Dkarate.env=local '-Dkarate.options=--tags @local'
```

Documentacion local:

```bash
cd code/docs
npm ci
npm run build:dev
npm run preview
```

## Structure

```text
fwk-karateautomulti/
├── code/
│   ├── archetype-karate-e2e/
│   ├── docs/
│   └── src/
├── e2e/
│   └── karate/
└── README.md
```

## Contribution

1. Crea una rama desde `main`.
2. Manten el flujo remoto en `~@local` y usa `@local` solo cuando el servicio demo este levantado.
3. Si tocas documentacion, valida `code/docs` con la build Antora local.
4. Abre un Pull Request con el alcance bien acotado.

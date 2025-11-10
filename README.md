# SauceDemo E2E and API Tests

Este proyecto contiene pruebas automatizadas para la aplicación SauceDemo, incluyendo pruebas E2E (end-to-end) y pruebas de API.

## Tecnologías Utilizadas

- Playwright para pruebas E2E
- Cucumber para BDD
- TypeScript
- Patrón Screenplay
- GitHub Actions para CI/CD

## Estructura del Proyecto

```
├── .github/
│   └── workflows/          # Configuración de GitHub Actions
├── features/              # Archivos feature de Cucumber
│   └── step_definitions/  # Implementación de los steps
├── src/
│   └── screenplay/        # Implementación del patrón Screenplay
├── tests/
│   ├── api/              # Pruebas de API
│   └── e2e/              # Pruebas E2E
└── package.json
```

## Configuración Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Instalar navegadores de Playwright:
   ```bash
   npx playwright install
   ```

3. Crear archivo .env con las credenciales necesarias:
   ```
   BASE_URL=https://www.saucedemo.com
   VALID_USERNAME=standard_user
   VALID_PASSWORD=secret_sauce
   ```

## Ejecutar Pruebas

### Pruebas E2E
```bash
npm run test:e2e
```

### Pruebas de API
```bash
npm run test:api
```

### Todas las pruebas
```bash
npm test
```

## Reportes

- Los reportes de Cucumber se generan en `cucumber-report.html`
- Los reportes de Playwright se generan en `playwright-report/`
- Los reportes de cobertura se generan en `coverage/`

## CI/CD

El proyecto está configurado con GitHub Actions para ejecutar las pruebas automáticamente:
- En cada push a las ramas main/master
- Manualmente desde la interfaz de GitHub Actions

Los resultados de las pruebas y los reportes se pueden ver en la pestaña "Actions" del repositorio.
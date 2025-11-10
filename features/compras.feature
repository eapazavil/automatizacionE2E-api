# language: es
Característica: Compras en SauceDemo
  Como cliente
  Quiero navegar y comprar productos
  Para obtener los artículos que necesito

  Escenario: Completar una compra exitosamente
    Dado que estoy en la página de inicio de sesión
    Cuando inicio sesión con credenciales válidas
    Y agrego "Sauce Labs Backpack" al carrito
    Y procedo al pago
    Y completo la información de envío
      | Nombre | Apellido | Código Postal |
      | Juan   | Pérez    | 12345         |
    Y finalizo la compra
    Entonces debo ver el mensaje de confirmación "Thank you for your order!"

  Escenario: Intento de inicio de sesión fallido
    Dado que estoy en la página de inicio de sesión
    Cuando intento iniciar sesión con credenciales inválidas
      | Usuario       | Contraseña    |
      | usuario_malo  | clave_mala    |
    Entonces debo ver un mensaje de error "Epic sadface: Username and password do not match"

  Escenario: Agregar múltiples productos al carrito y verificar total
    Dado que estoy en la página de inicio de sesión
    Cuando inicio sesión con credenciales válidas
    Y agrego los siguientes productos al carrito
      | Nombre del Producto    | Precio   |
      | Sauce Labs Backpack    | $29.99   |
      | Sauce Labs Bike Light  | $9.99    |
    Entonces el total del carrito debe ser "$39.98"
    Y el número de productos en el carrito debe ser "2"
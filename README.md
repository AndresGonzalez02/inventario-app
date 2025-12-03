# 📦 Sistema de Inventario

Una aplicación web moderna y completa para la gestión de inventario, desarrollada con HTML5, CSS3 y JavaScript vanilla.

## ✨ Características Principales

### 🔧 Funcionalidades CRUD
- **Agregar productos** con todos los campos requeridos
- **Editar productos** existentes
- **Eliminar productos** con confirmación
- **Ver productos** en tabla (escritorio) y tarjetas (móvil)

### 🔍 Búsqueda y Filtros
- **Búsqueda global** por nombre, referencia o marca
- **Filtro por marca** con dropdown dinámico
- **Filtro de stock bajo** (≤ 10 unidades)
- **Limpiar filtros** con un clic

### 📊 Dashboard
- **Total de productos** en inventario
- **Valor total** del inventario
- **Productos con stock bajo** identificados

### 📥 Exportación de Datos
- **Excel (.xlsx)** con formato profesional
- **CSV** compatible con cualquier sistema
- **PDF** con tabla completa y estadísticas

### 🖼️ Gestión de Imágenes
- **Subida opcional** de fotos de productos
- **Vista previa** antes de guardar
- **Drag & Drop** para móviles
- **Eliminación** fácil de imágenes

### 📱 Diseño Responsivo
- **Interfaz adaptativa** para móviles y escritorio
- **Tabla optimizada** para computadoras
- **Tarjetas touch-friendly** para móviles
- **Navegación intuitiva** en todos los dispositivos

## 🏗️ Estructura de Datos

Cada producto contiene:
```javascript
{
  id: number,           // ID único generado automáticamente
  name: string,         // Nombre del producto *
  reference: string,    // Código de referencia *
  brand: string,        // Marca del producto *
  quantity: number,     // Cantidad en stock *
  price: number,        // Precio unitario *
  image: string|null    // URL de la imagen (opcional)
}
```

*Campos obligatorios

## 🚀 Cómo Usar

### 1. Abrir la Aplicación
- Abre el archivo `index.html` en cualquier navegador moderno
- No requiere servidor web, funciona directamente desde el archivo

### 2. Agregar Productos
1. Haz clic en **"Agregar Producto"**
2. Completa todos los campos obligatorios
3. (Opcional) Agrega una foto del producto
4. Haz clic en **"Guardar Producto"**

### 3. Gestionar Inventario
- **Editar**: Haz clic en el ícono de lápiz
- **Eliminar**: Haz clic en el ícono de papelera
- **Buscar**: Usa la barra de búsqueda superior
- **Filtrar**: Usa los botones de filtro

### 4. Exportar Datos
- **Excel**: Para análisis detallado
- **CSV**: Para importar en otros sistemas
- **PDF**: Para reportes e impresión

## 💾 Almacenamiento

### Persistencia Local
- Los datos se guardan automáticamente en **localStorage** del navegador
- Los productos permanecen guardados al cerrar el navegador
- Cada navegador/equipo tiene sus propios datos

### Respaldo de Datos
Para hacer respaldo de tus datos:
1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console"
3. Ejecuta: `localStorage.getItem('inventoryProducts')`
4. Copia y guarda el resultado

## 🔧 Funciones Disponibles

### Funciones Principales
- `openModal()` - Abre formulario para agregar/editar
- `filterProducts()` - Aplica filtros de búsqueda
- `exportToExcel()` - Exporta a formato Excel
- `exportToCSV()` - Exporta a formato CSV
- `exportToPDF()` - Exporta a formato PDF

### Utilidades
- Los datos se validan antes de guardar
- Las imágenes se redimensionan automáticamente
- Se detectan productos con stock bajo
- Notificaciones de confirmación de acciones

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

### Dispositivos
- 📱 Teléfonos móviles (iOS/Android)
- 📱 Tablets
- 💻 Computadoras de escritorio
- 💻 Laptops

## 🛡️ Características de Seguridad

### Validación de Datos
- Campos obligatorios verificados
- Precios y cantidades validados
- Filtro XSS en datos mostrados

### Manejo de Imágenes
- Solo formatos de imagen permitidos
- Validación de tamaño de archivo
- Compresión automática para mejor rendimiento

## 📊 Limitaciones

### Almacenamiento
- Máximo ~5MB por navegador
- Para inventarios muy grandes (>1000 productos), considera usar un servidor
- Los datos son específicos de cada navegador/equipo

### Funcionalidades Futuras
- Sincronización en la nube
- Usuarios múltiples
- Roles y permisos
- Códigos de barras/QR
- Alertas automáticas por email

## 🎨 Personalización

### Colores y Estilos
El diseño utiliza un sistema de colores profesional:
- **Primario**: #0057FF (Azul profesional)
- **Secundario**: #111827 (Gris oscuro)
- **Alertas**: #DC2626 (Rojo), #16A34A (Verde)

### Fuentes
- **Inter**: Tipografía moderna optimizada para interfaces
- Escalas tipográficas para jerarquía clara
- Soporte completo para caracteres especiales (acentos)

## 🆘 Soporte y Solución de Problemas

### Problemas Comunes

**No se guardan los datos:**
- Verifica que el navegador soporte localStorage
- Revisa que no hayas borrado los datos del navegador

**Las imágenes no se muestran:**
- Verifica que las imágenes estén en formato JPG, PNG o WebP
- Algunos navegadores tienen límites de tamaño de archivo

**Exportación no funciona:**
- Verifica que tu navegador permita descargas
- Revisa el bloqueo de ventanas emergentes

### Datos de Ejemplo
Para probar la aplicación, puedes agregar productos de ejemplo:
1. Agrega manualmente algunos productos
2. O modifica el código JavaScript para incluir datos de prueba

## 📝 Notas Técnicas

### Dependencias
- **Excel**: Librería SheetJS para export
- **PDF**: jsPDF + autoTable para reportes
- **Iconos**: Lucide Icons para interfaz
- **Fuentes**: Google Fonts (Inter)

### Rendimiento
- Optimizado para inventarios hasta 1000 productos
- Renderizado virtual para listas grandes
- Compresión automática de imágenes
- Actualizaciones en tiempo real

---

**Desarrollado por MiniMax Agent** - Una solución completa y profesional para gestión de inventarios.
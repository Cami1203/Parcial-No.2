const express = require('express');
const cors = require('cors');
const client = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// CRUD PARA LA TABLA RESTAURANTE
app.post('/api/restaurante', async (req, res) => {
    const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
    try {
        await client.query(
            'INSERT INTO Restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5)',
            [id_rest, nombre, ciudad, direccion, fecha_apertura]
        );
        res.status(201).json({ success: true, message: 'Restaurante creado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/restaurante', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Restaurante');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/restaurante/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    try {
        await client.query(
            'UPDATE Restaurante SET nombre=$1, ciudad=$2, direccion=$3, fecha_apertura=$4 WHERE id_rest=$5',
            [nombre, ciudad, direccion, fecha_apertura, id]
        );
        res.json({ success: true, message: 'Restaurante actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/restaurante/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM Restaurante WHERE id_rest=$1', [id]);
        res.json({ success: true, message: 'Restaurante eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// CRUD PARA LA TABLA EMPLEADO
app.post('/api/empleado', async (req, res) => {
    const { id_empleado, nombre, rol, id_rest } = req.body;
    try {
        await client.query(
            'INSERT INTO Empleado (id_empleado, nombre, rol, id_rest) VALUES ($1, $2, $3, $4)',
            [id_empleado, nombre, rol, id_rest]
        );
        res.status(201).json({ success: true, message: 'Empleado creado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/empleado', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Empleado');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/empleado/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, rol, id_rest } = req.body;
    try {
        await client.query(
            'UPDATE Empleado SET nombre=$1, rol=$2, id_rest=$3 WHERE id_empleado=$4',
            [nombre, rol, id_rest, id]
        );
        res.json({ success: true, message: 'Empleado actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/empleado/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM Empleado WHERE id_empleado=$1', [id]);
        res.json({ success: true, message: 'Empleado eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// CRUD PARA LA TABLA PRODUCTO
app.post('/api/producto', async (req, res) => {
    const { id_prod, nombre, precio } = req.body;
    try {
        await client.query(
            'INSERT INTO Producto (id_prod, nombre, precio) VALUES ($1, $2, $3)',
            [id_prod, nombre, precio]
        );
        res.status(201).json({ success: true, message: 'Producto creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/producto', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Producto');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/producto/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    try {
        await client.query(
            'UPDATE Producto SET nombre=$1, precio=$2 WHERE id_prod=$3',
            [nombre, precio, id]
        );
        res.json({ success: true, message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/producto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM Producto WHERE id_prod=$1', [id]);
        res.json({ success: true, message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// CRUD PARA LA TABLA PEDIDO
app.post('/api/pedido', async (req, res) => {
    const { id_pedido, fecha, id_rest, total } = req.body;
    try {
        await client.query(
            'INSERT INTO Pedido (id_pedido, fecha, id_rest, total) VALUES ($1, $2, $3, $4)',
            [id_pedido, fecha, id_rest, total]
        );
        res.status(201).json({ success: true, message: 'Pedido creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/pedido', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Pedido');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/pedido/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, id_rest, total } = req.body;
    try {
        await client.query(
            'UPDATE Pedido SET fecha=$1, id_rest=$2, total=$3 WHERE id_pedido=$4',
            [fecha, id_rest, total, id]
        );
        res.json({ success: true, message: 'Pedido actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/pedido/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM Pedido WHERE id_pedido=$1', [id]);
        res.json({ success: true, message: 'Pedido eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// CRUD PARA LA TABLA DETALLE PEDIDO
app.post('/api/detalle_pedido', async (req, res) => {
    const { id_detalle, id_pedido, id_prod, cantidad, subtotal } = req.body;
    try {
        await client.query(
            'INSERT INTO DetallePedido (id_detalle, id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4, $5)',
            [id_detalle, id_pedido, id_prod, cantidad, subtotal]
        );
        res.status(201).json({ success: true, message: 'Detalle de pedido creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/detalle_pedido', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM DetallePedido');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/detalle_pedido/:id', async (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    try {
        await client.query(
            'UPDATE DetallePedido SET id_pedido=$1, id_prod=$2, cantidad=$3, subtotal=$4 WHERE id_detalle=$5',
            [id_pedido, id_prod, cantidad, subtotal, id]
        );
        res.json({ success: true, message: 'Detalle de pedido actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/detalle_pedido/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM DetallePedido WHERE id_detalle=$1', [id]);
        res.json({ success: true, message: 'Detalle de pedido eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




//Consultas Nativas

//Obtener todos los productos de un pedido específico
app.get('/api/productos-pedido/:id_pedido', async (req, res) => {
    const { id_pedido } = req.params;
    try {
        const result = await client.query(`
            SELECT p.id_prod, p.nombre, p.precio, dp.cantidad, dp.subtotal
            FROM DetallePedido dp
            JOIN Producto p ON dp.id_prod = p.id_prod
            WHERE dp.id_pedido = $1
        `, [id_pedido]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Obtener los productos más vendidos (más de X unidades)
app.get('/api/productos-mas-vendidos/:cantidad', async (req, res) => {
    const { cantidad } = req.params;
    try {
        const result = await client.query(`
            SELECT p.id_prod, p.nombre, SUM(dp.cantidad) AS total_vendido
            FROM DetallePedido dp
            JOIN Producto p ON dp.id_prod = p.id_prod
            GROUP BY p.id_prod, p.nombre
            HAVING SUM(dp.cantidad) > $1
            ORDER BY total_vendido DESC
        `, [cantidad]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Obtener el total de ventas por restaurante
app.get('/api/ventas-por-restaurante', async (req, res) => {
    try {
        const result = await client.query(`
            SELECT r.id_rest, r.nombre, SUM(p.total) AS total_ventas
            FROM Pedido p
            JOIN Restaurante r ON p.id_rest = r.id_rest
            GROUP BY r.id_rest, r.nombre
            ORDER BY total_ventas DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Obtener los pedidos realizados en una fecha específica
app.get('/api/pedidos-por-fecha/:fecha', async (req, res) => {
    const { fecha } = req.params;
    try {
        const result = await client.query(`
            SELECT * FROM Pedido dp
            WHERE fecha = $1
        `, [fecha]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Obtener los empleados por rol en un restaurante
app.get('/api/empleados-por-rol', async (req, res) => {
    const { rol, id_rest } = req.query;
    try {
        const result = await client.query(`
            SELECT * FROM Empleado
            WHERE rol = $1 AND id_rest = $2
        `, [rol, id_rest]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

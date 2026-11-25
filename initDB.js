import db from './src/config/database.js';

console.log('Iniciando creación de tablas')

db.exec(`
    DROP TABLE IF EXISTS servicios;
    DROP TABLE IF EXISTS categorias;
    CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL UNIQUE,
        descripcion TEXT NOT NULL,
        pagina TEXT NOT NULL,
        imagen TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS servicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        precio INTEGER NOT NULL,
        imagen TEXT NOT NULL,
        categoria_id INTEGER NOT NULL,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    );

    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rut TEXT NOT NULL UNIQUE,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        celular TEXT NOT NULL,
        prevision TEXT NOT NULL DEFAULT 'Fonasa'
            CHECK (prevision IN ('Fonasa', 'Isapre', 'Particular')),
        rol TEXT NOT NULL DEFAULT 'PACIENTE'
            CHECK (rol IN ('PACIENTE', 'ADMIN')),
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

console.log('Tablas creadas correctamente')
console.log('Iniciando creación de categorías')

db.exec(`
    INSERT INTO categorias (id, nombre, descripcion, pagina, imagen)
    VALUES
    (
        1,
        'Obesidad y síndrome metabólico',
        'Planes personalizados para mejorar hábitos, controlar el peso y favorecer una mejor salud metabólica.',
        'obesidad-sindrome-metabolico',
        'https://www.goredforwomen.org/es/-/media/AHA/H4GM/Article-Images/Lose-Weight-and-Keep-It-Off.jpg?h=683&iar=0&mw=1910&w=1024&sc_lang=es'
    ),
    (
        2,
        'Nutrición deportiva y rendimiento',
        'Alimentación enfocada en mejorar el rendimiento, la recuperación y la composición corporal.',
        'nutricion-deportiva',
        'https://online.unab.cl/blog/wp-content/uploads/2025/10/nutricion-deportiva.webp'
    ),
    (
        3,
        'Alimentación vegana, vegetariana y TCA',
        'Orientación nutricional adaptada a distintos tipos de alimentación y necesidades relacionadas con la conducta alimentaria.',
        'alimentacion-vegana-tca',
        'https://www.mytherapyapp.com/media/pages/es/blog/dieta-vegana-reduce-colesterol/1ae35bd2a4-1733691189/colesterol-dieta-vegana-titulo-1200x675-crop-1-q65-optimized.jpg'
    ),
    (
        4,
        'Nutrición pediátrica y familiar',
        'Orientación nutricional adaptada a distintos tipos de alimentación y necesidades relacionadas con la conducta alimentaria.',
        'nutricion-pediatrica-familiar',
        'https://salucity.com/img/especialidades/nutricion-infantil.webp'
    );
`);

console.log('Categorías insertadas correctamente');
console.log('Iniciando creación de servicios');

db.exec(`
    INSERT INTO servicios (nombre, descripcion, precio, imagen, categoria_id)
    VALUES
    (
        'Plan nutrición deportiva',
        'Para deportistas y personas con actividad física frecuente. Cálculo de requerimientos energéticos y proteicos.',
        70000,
        'http://localhost:3000/img/1.png',
        2
    ),
    (
        'Antropometría completa',
        'Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría.',
        18000,
        'http://localhost:3000/img/2.png',
        2
    ),
    (
        'Taller nutrición para deportistas',
        'Hidratación, nutrición pre y post entrenamiento, suplementación básica. Máx. 12 personas.',
        18000,
        'http://localhost:3000/img/3.png',
        2
    ),
    (
        'Primera consulta nutricional',
        'Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio [50 min].',
        35000,
        'http://localhost:3000/img/1.png',
        1
    ),
    (
        'Control nutricional (seguimiento)',
        'Seguimiento mensual: medición de indicadores y ajuste del plan vigente [30 min].',
        25000,
        'http://localhost:3000/img/2.png',
        1
    ),
    (
        'Control nutricional quincenal',
        'Para pacientes que requieren atención fuera de su control habitual [30 min].',
        22000,
        'http://localhost:3000/img/4.png',
        1
    ),
    (
        'Teleconsulta nutricional',
        'Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa [30 min].',
        20000,
        'http://localhost:3000/img/6.png',
        1
    ),
    (
        'Consulta de urgencia / reagendada',
        'Para pacientes que requieren atención fuera de su control habitual [30 min].',
        28000,
        'http://localhost:3000/img/3.png',
        1
    ),
    (
        'Plan pérdida de peso (1 mes)',
        'Incluye primera consulta + 1 control quincenal + plan alimenticio personalizado + seguimiento por WhatsApp.',
        65000,
        'http://localhost:3000/img/100.png',
        1
    ),
    (
        'Plan pérdida de peso (3 meses)',
        'Incluye primera consulta + 5 controles + 3 planes mensuales + seguimiento continuo',
        170000,
        'http://localhost:3000/img/100.png',
        1
    ),
    (
        'Plan control diabetes /hipertensión ',
        'Plan adaptado para patologías metabólicas. Coordinación con médico tratante si aplica.',
        75000,
        'http://localhost:3000/img/7.png',
        1
    ),
    (
        'Antropometría completa',
        'Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría',
        18000,
        'http://localhost:3000/img/10.png',
        1
    ),
    (
        'Biopedanciometría',
        'Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica',
        12000,
        'http://localhost:3000/img/11.png',
        1
    ),
    (
        'Análisis de laboratorio',
        'Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional',
        15000,
        'http://localhost:3000/img/13.png',
        1
    ),
    (
        'Plan alimentación infantil (2-12 años)',
        'Evaluación nutricional pediátrica y diseño de plan adaptado a la etapa de desarrollo del niño.',
        65000,
        'http://localhost:3000/img/1.png',
        4
    ),
    (
        'Bioimpedanciometría',
        'Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica.',
        12000,
        'http://localhost:3000/img/2.png',
        4
    ),
    (
        'Encuesta de hábitos alimentarios',
        'Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales.',
        10000,
        'http://localhost:3000/img/3.png',
        4
    ),
    (
        'Análisis de exámenes de laboratorio',
        'Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional.',
        15000,
        'http://localhost:3000/img/4.png',
        4
    ),
    (
        'Primera consulta nutricional',
        'Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio [50 min].',
        35000,
        'http://localhost:3000/img/1.png',
        3
    ),
    (
        'Control nutricional (seguimiento)',
        'Seguimiento mensual: medición de indicadores y ajuste del plan vigente [30 min].',
        25000,
        'http://localhost:3000/img/2.png',
        3
    ),
    (
        'Control nutricional quincenal',
        'Para pacientes que requieren atención fuera de su control habitual [30 min].',
        22000,
        'http://localhost:3000/img/3.png',
        3
    ),
    (
        'Teleconsulta nutricional',
        'Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa [30 min].',
        20000,
        'http://localhost:3000/img/4.png',
        3
    ),
    (
        'Consulta de urgencia / reagendada',
        'Para pacientes que requieren atención fuera de su control habitual [30 min].',
        28000,
        'http://localhost:3000/img/5.png',
        3
    ),
    (
        'Plan alimentación vegetariana/vegana',
        'Diseñado para garantizar aporte adecuado de proteínas, hierro, vitamina B12 y calcio sin productos animales.',
        68000,
        'http://localhost:3000/img/12.png',
        3
    ),
    (
        'Taller de alimentación saludable',
        'Máx. 10 personas. Conceptos básicos de alimentación equilibrada y lectura de etiquetas [90 min].',
        15000,
        'http://localhost:3000/img/16.png',
        3
    ),
    (
        'Taller de cocina nutritiva',
        'Preparación de recetas saludables. Incluye degustación. Máx. 8 personas [120 min].',
        20000,
        'http://localhost:3000/img/15.png',
        3
    );    
`);

console.log('Servicios insertados correctamente');

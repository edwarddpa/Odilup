CREATE DATABASE odilup

\c odilup;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    favorites INT[] FOREIGN KEY REFERENCES tattoos(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tattoos (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    from_admin BOOLEAN DEFAULT FALSE FOREIGN KEY REFERENCES users(admin),
    design_url TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    categories TEXT[],
    price DECIMAL(10, 2),
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    categories TEXT[],
    description TEXT,
    img_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tattoos (user_id, design_url, name, description, categories, price) VALUES
(1, 'https://i.ibb.co/8DN765tc/1.png', 'Guerrero del Sol', 'Tatuaje tribal con líneas curvas que representan fuerza y conexión con la naturaleza. Ideal para hombro o espalda.', ARRAY['Tribal', 'Blanco y negro'], 45),
(1, 'https://i.ibb.co/C3Vqdv5H/2.png', 'Mandala Cósmico', 'Diseño simétrico en blanco y negro con patrones florales y geométricos. Perfecto para antebrazo o pecho.', ARRAY['Geometrico', 'Blanco y negro'], 60),
(1, 'https://i.ibb.co/hxrkN2m5/3.png', 'Rosa en Llamas', 'Flor realista con efectos de fuego en los pétalos. Mezcla de color y sombreado para un acabado vibrante.', ARRAY['Realismo', 'A color'], 59),
(1, 'https://i.ibb.co/bj3TFZFY/4.png', 'Espíritu Samurai', 'Ilustración de un samurái con fondo de luna llena y cerezos. Detalles finos en armadura y rostro.', ARRAY['Oriental', 'A color'], 90),
(1, 'https://i.ibb.co/cKppBqYm/5.png', 'Cráneo Steampunk', 'Cráneo mecánico con engranajes, tubos y detalles metálicos. Estilo oscuro y futurista.', ARRAY['Fantasia', 'A color'], 65),
(1, 'https://i.ibb.co/Mx9nBf7n/6.png', 'Alas de Libertad', 'Alas abiertas con plumas detalladas, ideal para espalda o clavícula. Representa fuerza y superación.', ARRAY['Simbolico'], 50);

INSERT INTO users (username, email, password, admin) VALUES
('odilup', 'edpulidoanez@gmail.com', 'hashed_password', TRUE);


INSERT INTO books (title, categories, description, img_url) VALUES
("El Arca", "Ficción,Suspenso,Misterio", "Una expedición al imponente pico El Kaçkar se convierte en una lucha por la supervivencia cuando un grupo de especialistas en turismo y aventuras descubre una estructura desconocida y una criatura que desafía las leyes de la ciencia. Atrapados en un entorno cada vez más hostil, deberán enfrentar lo inexplicable mientras desentrañan los secretos ocultos en las profundidades de la montaña.",
"https://i.ibb.co/N2p4L1xh/El-Arca.jpg"),

("El Cambio del Acero al Vidrio", "Evolución emocional,Reflexión crítica", "Un libro técnico y educativo que explora la transformación de la fortaleza emocional y su impacto en la identidad. A través de una profunda analogía, compara la resistencia del acero con la fragilidad del vidrio, analizando cómo la aceptación pasiva ha reemplazado la firmeza e integridad.", 
"https://i.ibb.co/ZjMGWx2/Del-Acero-Al-Vidrio.jpg"),

("La Foto", "Crimen,Intriga,Conspiración", "Un fotógrafo en apuros decide participar en el World Nature Photography, con la esperanza de ganar el premio de un millón de dólares. Se adentra en el Parque Nacional Olympic, buscando capturar la foto perfecta, pero se ve envuelto en una oscura conspiración de alto nivel.", 
"https://i.ibb.co/53PCKYF/La-Foto.jpg"),

("Gerencia de la Vida", "Desarrollo personal,Liderazgo,Estrategia", "Cada decisión influye en nuestro futuro. La vida, como una empresa, requiere planificación y estrategia para el éxito. Este libro te enseña a aplicar principios de liderazgo y gerencia en el día a día, convirtiendo desafíos en oportunidades.", 
"https://i.ibb.co/Y4M0zZM4/Gerencia-de-la-Vida.jpg"),

("La Llegada", "Ficción,Intriga,Misterio", "Un meteorito desciende a la Tierra, pero su naturaleza desafía toda lógica. Un equipo de científicos y exploradores intenta descifrar su origen y propósito, enfrentando secretos ocultos y teorías conspirativas.", 
"https://i.ibb.co/LDrGnfbp/La-Llegada.jpg"),

("Uróboros", "Crimen,Conspiración,Venganza", "En las sombras del mundo, una organización secreta entrena a huérfanos para convertirlos en letales centinelas. Un thriller implacable donde el destino parece repetirse, una y otra vez.", 
"https://i.ibb.co/7Jdhv3F1/Uroboro.jpg");


CREATE TABLE favorites (
  user_id   BIGINT NOT NULL,
  tattoo_id BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, tattoo_id),
  CONSTRAINT fk_fav_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_fav_tattoo FOREIGN KEY (tattoo_id) REFERENCES tattoos(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
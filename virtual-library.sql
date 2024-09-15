CREATE USER
  virtual_library 
WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  ENCRYPTED PASSWORD 'insert_password';
  
 CREATE DATABASE 
 	virtual_library 
 WITH
 	OWNER = virtual_library
 	ENCODING = 'UTF8'
  	TABLESPACE = pg_default
  	CONNECTION LIMIT = -1;

CREATE TABLE public.books (
	id serial4 NOT NULL,
	title varchar(255) NOT NULL,
	description varchar(1000) NOT NULL,
	price numeric NOT NULL,
	img varchar(200) NULL,
	author_id int4 NOT NULL,
	CONSTRAINT books_pkey PRIMARY KEY (id),
);

CREATE TABLE public.authors (
	id serial4 NOT NULL,
	firstname varchar(30) NOT NULL,
	lastname varchar(30) NOT NULL,
	CONSTRAINT authors_pkey PRIMARY KEY (id)
);


CREATE TABLE public.basket (
	order_id int4 NOT NULL,
	book_id int4 NOT NULL,
	amount int4 NOT NULL,
	CONSTRAINT basket_pk PRIMARY KEY (order_id, book_id),
);

CREATE TABLE public.orders (
	id int4 DEFAULT nextval('orders_basket_id_seq'::regclass) NOT NULL,
	sum numeric NOT NULL,
	payment_status bool DEFAULT false NULL,
	firstname varchar(20) NOT NULL,
	lastname varchar(30) NOT NULL,
	email varchar(50) NOT NULL,
	phone_number varchar(9) NOT NULL,
	city varchar(30) NOT NULL,
	address varchar(50) NOT NULL,
	postal_code varchar(6) NOT NULL,
	house_number varchar(10) NOT NULL,
	flat_number varchar(10) DEFAULT 'N/A'::character varying NOT NULL,
	payment_method varchar(30) NOT NULL,
	CONSTRAINT orders_payment_method_check CHECK (((payment_method)::text = ANY ((ARRAY['Gotówka przy odbiorze'::character varying, 'Karta'::character varying, 'Przelew'::character varying])::text[]))),
	CONSTRAINT orders_pkey PRIMARY KEY (id)
);


ALTER SCHEMA public OWNER TO virtual_library;

ALTER TABLE public.books OWNER TO virtual_library;
ALTER TABLE public.authors OWNER TO virtual_library;
ALTER TABLE public.basket OWNER TO virtual_library;
ALTER TABLE public.orders OWNER TO virtual_library;

ALTER TABLE public.books ADD CONSTRAINT authors_fk FOREIGN KEY (author_id) REFERENCES public.authors(id);
ALTER TABLE public.basket ADD CONSTRAINT basket_books_fk FOREIGN KEY (book_id) REFERENCES public.books(id);
ALTER TABLE public.basket ADD CONSTRAINT basket_orders_fk FOREIGN KEY (order_id) REFERENCES public.orders(id);


INSERT INTO public.authors (id, firstname, lastname) VALUES
(1, 'Sandra', 'Vensko'),
(2, 'Agustina', 'Bazterrica'),
(3, 'George', 'Orwell'),
(4, 'Harper', 'Lee'),
(5, 'J.K.', 'Rowling'),
(6, 'F. Scott', 'Fitzgerald'),
(7, 'Jane', 'Austen'),
(8, 'Gabriel', 'García Márquez'),
(9, 'Fyodor', 'Dostoevsky'),
(10, 'J.R.R.', 'Tolkien');

INSERT INTO public.books (id, title, description, price, img, author_id) VALUES
(1, 'Vestules Naktssargam', 'Vestules Naktssargam ir dienasgrāmatas formā sarakstīts īsprozas darbs par indivīdu savstarpējo attiecību būtiskām niansēm cilvēka dzīves dažādos dzīves posmos, atklāta saruna par vientulību, divvientulības robežām un to pārvarēšanu vai pieņemšanu. Ikkatra teksta metafora ir šīks mirklis dzīves telpā, kas pārtaips sarunās ar Naktsargu - kā tēlu, kā alter-ego, neatkarīgi no vietas vai laika, ko katrs izdzīvojam šeit un tagad.', 130, 'book1.jpg', 1),
(2, 'Cadáver exquisito', 'En esta despiadada distopía -tan brutal como sutil, tan alegórica como realista-, Agustina Bazterrica inspira, con el poder explosivo de la ficción, sensaciones y debates de suma actualidad.', 80, 'book2.jpg', 2),
(3, '1984', '1984 es una novela distópica de George Orwell. Es una crítica social de las prácticas totalitarias y una reflexión sobre la pérdida de libertad en un mundo vigilado.', 100, 'book3.jpg', 3),
(4, 'To Kill a Mockingbird', 'A novel about the serious issues of rape and racial inequality, ''To Kill a Mockingbird'' is renowned for its warmth and humor despite dealing with serious issues.', 90, 'book4.jpg', 4),
(5, 'Harry Potter and the Philosopher''s Stone', 'The first book in the Harry Potter series, this novel introduces us to Harry Potter, a young wizard who discovers his magical heritage on his 11th birthday.', 150, 'book5.jpg', 5),
(6, 'The Great Gatsby', 'The Great Gatsby is a story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set in the roaring 1920s.', 70, 'book6.jpg', 6),
(7, 'Pride and Prejudice', 'Pride and Prejudice is a romantic novel of manners written by Jane Austen. It charts the emotional development of the protagonist Elizabeth Bennet.', 85, 'book7.jpg', 7),
(8, 'One Hundred Years of Solitude', 'A landmark 1967 novel by Gabriel García Márquez that tells the multi-generational story of the Buendía family, set in the fictional town of Macondo.', 120, 'book8.jpg', 8),
(9, 'Crime and Punishment', 'Crime and Punishment is a psychological drama that explores the moral dilemmas faced by its protagonist, Rodion Raskolnikov, as he struggles with the consequences of murder.', 110, 'book9.jpg', 9),
(10, 'The Lord of the Rings: The Fellowship of the Ring', 'The first volume of The Lord of the Rings trilogy, this epic fantasy novel follows the journey of Frodo Baggins as he embarks on an adventure to destroy the One Ring.', 140, 'book10.jpg', 10);




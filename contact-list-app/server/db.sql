--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: appleguanliyuan
--

CREATE TABLE public.address (
    id integer NOT NULL,
    street character varying(255),
    city character varying(255) NOT NULL,
    state character varying(25) NOT NULL,
    zip_code character varying(10) NOT NULL,
    country character varying(255) NOT NULL,
    contact_id integer NOT NULL
);


ALTER TABLE public.address OWNER TO appleguanliyuan;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: appleguanliyuan
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO appleguanliyuan;

--
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appleguanliyuan
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- Name: contact; Type: TABLE; Schema: public; Owner: appleguanliyuan
--

CREATE TABLE public.contact (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(30)
);


ALTER TABLE public.contact OWNER TO appleguanliyuan;

--
-- Name: contact_id_seq; Type: SEQUENCE; Schema: public; Owner: appleguanliyuan
--

CREATE SEQUENCE public.contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_id_seq OWNER TO appleguanliyuan;

--
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appleguanliyuan
--

ALTER SEQUENCE public.contact_id_seq OWNED BY public.contact.id;


--
-- Name: note; Type: TABLE; Schema: public; Owner: appleguanliyuan
--

CREATE TABLE public.note (
    id integer NOT NULL,
    notes text,
    contact_id integer NOT NULL,
    image_url character varying(255)
);


ALTER TABLE public.note OWNER TO appleguanliyuan;

--
-- Name: note_id_seq; Type: SEQUENCE; Schema: public; Owner: appleguanliyuan
--

CREATE SEQUENCE public.note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.note_id_seq OWNER TO appleguanliyuan;

--
-- Name: note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appleguanliyuan
--

ALTER SEQUENCE public.note_id_seq OWNED BY public.note.id;


--
-- Name: address id; Type: DEFAULT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- Name: contact id; Type: DEFAULT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.contact ALTER COLUMN id SET DEFAULT nextval('public.contact_id_seq'::regclass);


--
-- Name: note id; Type: DEFAULT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.note ALTER COLUMN id SET DEFAULT nextval('public.note_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: appleguanliyuan
--

COPY public.address (id, street, city, state, zip_code, country, contact_id) FROM stdin;
1	Cypress Creek Rd	Cedar Park	TX	78717	USA	1
2	Brushy Creek Rd	Austin	TX	78613	USA	2
5	Lamer Rd	San Diego	CA	92037	USA	9
\.


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: appleguanliyuan
--

COPY public.contact (id, first_name, last_name, email, phone_number) FROM stdin;
9	Doe	Zhao	doe@gmail.com	222-111-1111
2	Dingding	H	dingding@gmail.com	000-222-1111
11	Xiahui	Zhang	xhz0729@gmail.com	999-999-9999
1	Dou	Zhang	doudou@gmail.com	111-222-0000
\.


--
-- Data for Name: note; Type: TABLE DATA; Schema: public; Owner: appleguanliyuan
--

COPY public.note (id, notes, contact_id, image_url) FROM stdin;
2	She is an experienced front-end developer	2	https://i.pinimg.com/736x/0e/69/96/0e6996dd20f80e75c477d197c5cd08de.jpg
1	We met at a tech meeting, and he mentioned that he's skilled in full-stack development	1	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfT_3elt-smZ4tv7ZkmOp9KQF20I_I8GBCEYJi_uOs3CUIjEDDohQZtkFQleO2_LCl0vk&usqp=CAU
5	Call Doe to get fresh coffee delivery	9	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHcnePDV5UG5V2OnKpcK9QtpAWb2sBEWITazAElzHwwrdtMQm_i4l19Fguw&s
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appleguanliyuan
--

SELECT pg_catalog.setval('public.address_id_seq', 5, true);


--
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appleguanliyuan
--

SELECT pg_catalog.setval('public.contact_id_seq', 11, true);


--
-- Name: note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appleguanliyuan
--

SELECT pg_catalog.setval('public.note_id_seq', 5, true);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: note note_pkey; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_pkey PRIMARY KEY (id);


--
-- Name: address address_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contact(id) ON DELETE CASCADE;


--
-- Name: note note_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contact(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


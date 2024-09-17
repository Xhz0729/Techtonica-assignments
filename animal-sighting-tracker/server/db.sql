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
-- Name: individuals; Type: TABLE; Schema: public; Owner: appleguanliyuan
--

CREATE TABLE public.individuals (
    id integer NOT NULL,
    nickname character varying(255) NOT NULL,
    species_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.individuals OWNER TO appleguanliyuan;

--
-- Name: individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: appleguanliyuan
--

CREATE SEQUENCE public.individuals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.individuals_id_seq OWNER TO appleguanliyuan;

--
-- Name: individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appleguanliyuan
--

ALTER SEQUENCE public.individuals_id_seq OWNED BY public.individuals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: appleguanliyuan
--

CREATE TABLE public.sightings (
    id integer NOT NULL,
    sighting_date timestamp without time zone,
    individual_id integer,
    location text,
    is_healthy boolean,
    sighter_email character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sightings OWNER TO appleguanliyuan;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: appleguanliyuan
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sightings_id_seq OWNER TO appleguanliyuan;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appleguanliyuan
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: appleguanliyuan
--

CREATE TABLE public.species (
    id integer NOT NULL,
    common_name character varying(255) NOT NULL,
    scientific_name character varying(255) NOT NULL,
    estimated_population integer,
    conservation_state_code character varying(10),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.species OWNER TO appleguanliyuan;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: appleguanliyuan
--

CREATE SEQUENCE public.species_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.species_id_seq OWNER TO appleguanliyuan;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appleguanliyuan
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: individuals id; Type: DEFAULT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.individuals ALTER COLUMN id SET DEFAULT nextval('public.individuals_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: appleguanliyuan
--

COPY public.individuals (id, nickname, species_id, created_at) FROM stdin;
1	Maple	1	2024-09-16 23:10:25.444045
2	Oak	1	2024-09-16 23:10:25.444045
3	Speedy	2	2024-09-16 23:10:25.444045
4	Peanut	2	2024-09-16 23:10:25.444045
5	Helado	3	2024-09-16 23:10:25.444045
6	Dewy	3	2024-09-16 23:10:25.444045
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: appleguanliyuan
--

COPY public.sightings (id, sighting_date, individual_id, location, is_healthy, sighter_email, created_at) FROM stdin;
1	2022-02-02 00:00:00	1	Pocosin Lakes National Wildlife Refuge	t	maple_sighter@gmail.com	2024-09-16 23:23:00.003222
2	2023-05-20 00:00:00	2	St. Vincent National Wildlife Refuge	t	oat_sighter@gamil.com	2024-09-16 23:23:00.003222
3	2024-07-29 00:00:00	3	Northern Mexico	\N	speedy_sighter@gmail.com	2024-09-16 23:23:00.003222
4	2021-09-09 00:00:00	5	Moreton Bay	t	helado_sighter@gmail.com	2024-09-16 23:23:00.003222
5	2020-01-01 00:00:00	6	Moreton Bay	f	dewy_sighter@gamil.com	2024-09-16 23:23:00.003222
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: appleguanliyuan
--

COPY public.species (id, common_name, scientific_name, estimated_population, conservation_state_code, created_at) FROM stdin;
1	Red wolves	rufus	22	CR	2024-09-16 21:41:04.010892
2	Bolson tortoise	Gopherus flavomarginatus	2500	CR	2024-09-16 21:41:04.010892
3	Dugongs	Dugong dugon	100000	VU	2024-09-16 21:41:04.010892
\.


--
-- Name: individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appleguanliyuan
--

SELECT pg_catalog.setval('public.individuals_id_seq', 6, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appleguanliyuan
--

SELECT pg_catalog.setval('public.sightings_id_seq', 5, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appleguanliyuan
--

SELECT pg_catalog.setval('public.species_id_seq', 3, true);


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: individuals individuals_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id) ON DELETE CASCADE;


--
-- Name: sightings sightings_individual_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.individuals(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


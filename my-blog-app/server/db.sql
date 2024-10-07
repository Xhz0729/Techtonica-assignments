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
-- Name: post_details; Type: TABLE; Schema: public; Owner: appleguanliyuan
--

CREATE TABLE public.post_details (
    id integer NOT NULL,
    post_id integer,
    details text NOT NULL,
    image_url character varying(255)
);


ALTER TABLE public.post_details OWNER TO appleguanliyuan;

--
-- Name: post_details_id_seq; Type: SEQUENCE; Schema: public; Owner: appleguanliyuan
--

CREATE SEQUENCE public.post_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_details_id_seq OWNER TO appleguanliyuan;

--
-- Name: post_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appleguanliyuan
--

ALTER SEQUENCE public.post_details_id_seq OWNED BY public.post_details.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: appleguanliyuan
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.posts OWNER TO appleguanliyuan;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: appleguanliyuan
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO appleguanliyuan;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appleguanliyuan
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: appleguanliyuan
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO appleguanliyuan;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: appleguanliyuan
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO appleguanliyuan;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appleguanliyuan
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: post_details id; Type: DEFAULT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.post_details ALTER COLUMN id SET DEFAULT nextval('public.post_details_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: post_details; Type: TABLE DATA; Schema: public; Owner: appleguanliyuan
--

COPY public.post_details (id, post_id, details, image_url) FROM stdin;
1	1	Brian Head\n\nAlthough it might be best known for its ski resort, [Brian Head is a year-round destination](https://www.zionadventurephotog.com/single-post/ultimate-guide-to-brian-head-utah), and the fall colors are absolutely breathtaking. The groves of aspen in Brian Head turn gold and stand out against the evergreens and bristlecone pines. You can take a chairlift ride up the mountainside to see the fall colors in Utah from a bird’s-eye perspective or take a hike through Cedar Breaks National Monument to see the colors up close.\nBEST TIME TO SEE THE FALL COLORS\nSince Brian Head is at a higher elevation, you can usually find the best fall colors here the last week of September.	https://www.mickeyshannon.com/photos/beckwith-beauty.jpg
2	2	Challenges of Historical Home Restoration. Restoration of an old house can give a lot of satisfaction, but it also brings many difficulties. A main difficulty is to keep the original architecture and materials but at the same time make sure that the house follows current rules and standards for building.\n\nOld houses can have problems with their structure, water harm, termites, and different kinds of wear. They need a detailed check and fix by expert people.\n\nAlso, finding real stuff and surfaces that are right for the house’s age is hard because many old construction materials are not easy to get now.\n\nTechniques and Approaches to Historical Home Restoration. Maintaining old buildings so that they keep their historical value needs careful work to both conserve and change them if needed.\n\nWhen fixing up a historical house, people usually mix repairing with upgrading methods to make sure the building stays true to its original design but also fits today’s lifestyle requirements.\n\nExpert workers and people who maintain old buildings apply age-old ways of constructing and original materials to fix and bring back historical details like plaster, wood structures, stone work, and roofs.\n\nIf the first materials can’t be used anymore, specialists might use methods like making copies where new substances are made to look just like the originals in appearance and qualities.	https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=800
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: appleguanliyuan
--

COPY public.posts (id, title, content, user_id, created_at) FROM stdin;
1	Spectacular Fall Colors in Utah Near Zion – When & Where to See Autumn Foliage	When you think of fall colors in Utah, the northern region near Salt Lake City might come to mind first with its mountains and cooler temps. However, while most people don’t think of southern Utah for fall colors, the desert definitely holds special fall magic with the background of the red rocks. As a photographer in Zion + Southern Utah, fall is an absolute dream!	2	2024-10-03 02:00:48.052001
2	5 Useful Tips for Major Home Renovation Projects	Renovating your home is one of the more exciting tasks one can put on their to-do list. However, it can still be incredibly overwhelming and cause a lot of stress! If you’re feeling daunted by the journey that lies ahead, here are a few tips for how you can make the process a little easier and more seamless.	1	2024-10-03 02:02:36.359436
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: appleguanliyuan
--

COPY public.users (id, username, email, password) FROM stdin;
1	Xiahui	xiahui@gmail.com	$2b$10$A7Zgs.WOBEhSJqVvlOg2YeBi94w2tWfMEkKypSrOj6oQutXD2E2p2
2	Zoe	zoe@gmail.com	$2b$10$QnlPirL.RNS/uBfeYkOeJOPhggixKnKrpPCgVaazAA9CC5VijjGpS
3	Dou	dou@gmail.com	$2b$10$Gfclil9NYxLQT5THxLw3MOdqlTtR1n9vdCzI3e0vicZmddFS0FqXC
5	Cali	cali@gmail.com	$2b$10$O7Ajt2izRS3ddwmFZ8yDfepJrecV936/GHPp5V9X576T.VRO8sk5.
\.


--
-- Name: post_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appleguanliyuan
--

SELECT pg_catalog.setval('public.post_details_id_seq', 2, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appleguanliyuan
--

SELECT pg_catalog.setval('public.posts_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appleguanliyuan
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: post_details post_details_pkey; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.post_details
    ADD CONSTRAINT post_details_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: post_details post_details_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.post_details
    ADD CONSTRAINT post_details_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appleguanliyuan
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


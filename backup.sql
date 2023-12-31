PGDMP     	                    {            sales    15.2    15.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    49426    sales    DATABASE     �   CREATE DATABASE sales WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE sales;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    49514    product    TABLE     �   CREATE TABLE public.product (
    id integer NOT NULL,
    name_product character varying(255),
    type_id integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.product;
       public         heap    postgres    false    4            �            1259    49513    product_id_seq    SEQUENCE     �   ALTER TABLE public.product ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    215            �            1259    49549    stok    TABLE     �   CREATE TABLE public.stok (
    id integer NOT NULL,
    product_id integer,
    quantity integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.stok;
       public         heap    postgres    false    4            �            1259    49548    stok_id_seq    SEQUENCE     �   ALTER TABLE public.stok ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.stok_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221    4            �            1259    49542    transactions    TABLE     �   CREATE TABLE public.transactions (
    id integer NOT NULL,
    product_id integer,
    quantity_sold integer,
    date_transaction date,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
     DROP TABLE public.transactions;
       public         heap    postgres    false    4            �            1259    49541    transactions_id_seq    SEQUENCE     �   ALTER TABLE public.transactions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219    4            �            1259    49535    type_products    TABLE     �   CREATE TABLE public.type_products (
    id integer NOT NULL,
    name_type_product character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 !   DROP TABLE public.type_products;
       public         heap    postgres    false    4            �            1259    49534    type_products_id_seq    SEQUENCE     �   ALTER TABLE public.type_products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.type_products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217    4                      0    49514    product 
   TABLE DATA           V   COPY public.product (id, name_product, type_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   )                 0    49549    stok 
   TABLE DATA           R   COPY public.stok (id, product_id, quantity, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   ,                 0    49542    transactions 
   TABLE DATA           q   COPY public.transactions (id, product_id, quantity_sold, date_transaction, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   ,                 0    49535    type_products 
   TABLE DATA           X   COPY public.type_products (id, name_type_product, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   2                  0    0    product_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.product_id_seq', 21, true);
          public          postgres    false    214                       0    0    stok_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.stok_id_seq', 19, true);
          public          postgres    false    220                       0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 34, true);
          public          postgres    false    218                        0    0    type_products_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.type_products_id_seq', 4, true);
          public          postgres    false    216            y           2606    49519    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    215                       2606    49554    stok stok_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.stok
    ADD CONSTRAINT stok_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.stok DROP CONSTRAINT stok_pkey;
       public            postgres    false    221            }           2606    49547    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    219            {           2606    49540     type_products type_products_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.type_products
    ADD CONSTRAINT type_products_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.type_products DROP CONSTRAINT type_products_pkey;
       public            postgres    false    217               �   x�u�Kj�@����@�^���Rh�ٌ�BM�.^���M����~I�^s�N�S��ѩcd9a:�����8���<7�}U}��r��E6
����n8�y�?����0ƍu���ޞ�~Y?�bR�R��d��վ���Nv�d>AL���$�۲�&�%�j����[�r0N����Z��,t�RH��#K�̞���M�s��]2Q���0�ݤA�݆��S�e��dy%�W�պ����*�k�         �   x�m�ˍ�0�3]E��O���
�K9�b�������	�����z��bpR�^?G���g�˱�xT��f��o�V8gF`��ߘ/�M}����ߝ��\Z,�зk�;��j��j)��a|e�>m����������9m+%ۋ�!y����<�r���MP��K�' 1�4���\y�3�W5��Ţ]�ߵp�wJ�K��B.�@i��S�Yͺ�r�Nԏ���z��ig�����j         �   x����m�0D�ti���T�`��#����M���EF�TTv�.q<m�܁�a5"٥�:�~7�'�e(����#���'�3�>�Pn��8y{��lhg�n��������#ÔaQ�'�A���n����-�t�`Bt��G�BR�D�w>��L���Ƀѧ�ݵ����0B��]�!�#z�2�5�Ehw�����x�$\&�Վ�&m8����jk��_!<O����۶�)G�[         Q   x�3����+.�-��4202�5��54P0��20�2�г���0����2�H�MMJ-*��@Wjfeh�gd`hnnR���� �<y     
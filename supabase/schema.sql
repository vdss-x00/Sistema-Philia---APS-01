create table organizers (
    id uuid primary key,
    name varchar(100) not null,
    description varchar(255),
    icon varchar(10),
    active boolean not null default true,
    created_at timestamp with time zone default now()
);

create table campaigns (
    id uuid primary key,
    organizer_id uuid not null,
    title varchar(150) not null,
    description varchar(500),
    image varchar(255),
    goal_amount numeric(12, 2) not null,
    active boolean not null default true,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),

    constraint fk_campaigns_organizer
        foreign key (organizer_id)
        references organizers(id)
);

create index idx_campaigns_organizer_id
    on campaigns(organizer_id);
USE `steam_games`;

ALTER TABLE games RENAME COLUMN current_price TO currentPrice;
ALTER TABLE games RENAME COLUMN publisher_id TO publisherId;
ALTER TABLE games RENAME COLUMN release_date TO releaseDate;
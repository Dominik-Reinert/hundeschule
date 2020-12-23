
insert into app_user (person_id, password, is_admin) 
    select 
        id, 
        '769ebf7d6ac2621ca03240dbb7ce944215b933877e1d55edad615d4f3049b9ddc40586333c26b6fe2b8572e1d150774b33bd564f3b4b7586c096221f6d53966f', 
        true 
    from person where dvg_id = 1234
;
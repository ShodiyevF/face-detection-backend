insert into branches (branch_name) values 
('Nasiya savdo 1'),
('Nasiya savdo 2'),
('Nasiya savdo 3'),
('Pokiza');

insert into userrole (role_name) values
('Dasturchi'),
('HR'),
('Qadoqlovchi'),
('Dizayner');

insert into users (user_firstname, user_lastname, user_img, user_email, user_password, role_id, branch_id) values 
('John', 'Doe', 'TEST/PATH', 'johndoe@gmail.com', '12345678', 'cccb970d-85fc-4e8e-911b-977d87eac80a', 'ab37294b-c3c3-489c-b60f-a352a66ffe71'),
('Fayzulloh', 'ShodiyevF', 'TEST/PATH', 'fayzullohwork@gmail.com', '6661114f', 'cccb970d-85fc-4e8e-911b-977d87eac80a', 'ab37294b-c3c3-489c-b60f-a352a66ffe71'),
('Muhammad rizo', 'Rapiqjonov', 'TEST/PATH', '', '', 'cccb970d-85fc-4e8e-911b-977d87eac80a', 'ab37294b-c3c3-489c-b60f-a352a66ffe71');
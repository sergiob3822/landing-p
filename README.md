### LANDING PAGE + PIXEL META INCLUÍDO ###
* Funcionamiento:
   - Cliente ---> Click Botón de "Empezar a Jugar" 
   - Botón ---> Guarda datos de Facebook/Instagram del cliente
   - Botón ---> Redirecciona al cliente a los números vinculados en .env.local
   - Redirección ---> El cliente aparece con un mensaje de bienvenida dentro del chat
   - Pixel ---> Pixel envía datos de cliente a supabase y este se guarda
   - Supabase ---> Los datos diarios se guardan en el servidor local a través de un cloudflare tunnel para tener más control y backup
   - Server_Local ---> Se cargan con un script las ventas que se realizan por día vinculando los números de clientes a sus cuentas meta correspondientes
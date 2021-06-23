<%-- 
    Document   : Recibe Datos
    Created on : 25/08/2009, 11:11:56 AM
    Author     : Alverik
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h2>Hello World!</h2>
        <%= request.getParameter("nombre") %>
        <%= request.getParameter("paterno") %>
        <%= request.getParameter("materno") %>
        <%= request.getParameter("fechaNacimiento") %>
    </body>
</html>

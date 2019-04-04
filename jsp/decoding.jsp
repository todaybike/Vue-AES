<%@ page language="java" contentType="text/json; charset=UTF-8" trimDirectiveWhitespaces="true" %>
<%@ page import="test.*" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%
	Crypto crypto = new Crypto();
	String key = "abcdefghijklmnopqrstuvxyz0123456";
	String line = request.getParameter("line");
	// System.out.println("line: "+line);

	String decoded = crypto.decrypt(line,key);
	// System.out.println("decoded: " + decoded );
%>
{
	"line" : "<%= line %>",
	"decoded" : "<%= decoded %>"
}

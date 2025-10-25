#!/usr/bin/env python3
"""
Servidor local simple para el proyecto "Nuestro Primer Mes Siendo Novios"
Desarrollado por Antony Salcedo
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuración del servidor
PORT = 8000
HOST = "localhost"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Manejador personalizado para servir archivos estáticos"""
    
    def end_headers(self):
        # Agregar headers para CORS y cache
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        # Redirigir a index.html si se accede a la raíz
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

def start_server():
    """Iniciar el servidor local"""
    try:
        # Cambiar al directorio del proyecto
        project_dir = Path(__file__).parent
        os.chdir(project_dir)
        
        # Crear el servidor
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            print("=" * 60)
            print("💕 SERVIDOR LOCAL - NUESTRO PRIMER MES SIENDO NOVIOS 💕")
            print("=" * 60)
            print(f"🌐 Servidor ejecutándose en: http://{HOST}:{PORT}")
            print(f"📁 Directorio: {project_dir}")
            print("=" * 60)
            print("🚀 Abriendo navegador...")
            print("💡 Presiona Ctrl+C para detener el servidor")
            print("=" * 60)
            
            # Abrir navegador automáticamente
            webbrowser.open(f'http://{HOST}:{PORT}')
            
            # Iniciar el servidor
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n" + "=" * 60)
        print("🛑 Servidor detenido por el usuario")
        print("💕 ¡Gracias por usar nuestro proyecto!")
        print("=" * 60)
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Puerto ya en uso
            print(f"❌ Error: El puerto {PORT} ya está en uso")
            print(f"💡 Intenta con otro puerto o detén el proceso que lo está usando")
        else:
            print(f"❌ Error al iniciar el servidor: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        sys.exit(1)

if __name__ == "__main__":
    start_server()

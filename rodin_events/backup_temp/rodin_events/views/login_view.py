import customtkinter as ctk
from PIL import Image
import os

class LoginView(ctk.CTkFrame):
    def __init__(self, master, on_login_success, **kwargs):
        super().__init__(master, **kwargs)
        self.on_login_success = on_login_success
        
        # Main Layout
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(0, weight=1)
        
        # Main Container (The dark box - set to pure black to match logo)
        self.main_box = ctk.CTkFrame(self, fg_color="#000000", corner_radius=20, border_width=1, border_color="#333333")
        self.main_box.place(relx=0.5, rely=0.5, anchor="center", relwidth=0.8, relheight=0.7)
        
        # Split Columns
        self.main_box.grid_columnconfigure(0, weight=1) # Left
        self.main_box.grid_columnconfigure(1, weight=0) # Line
        self.main_box.grid_columnconfigure(2, weight=1) # Right
        self.main_box.grid_rowconfigure(0, weight=1)

        # --- LEFT SIDE ---
        self.left_side = ctk.CTkFrame(self.main_box, fg_color="transparent")
        self.left_side.grid(row=0, column=0, sticky="nsew", padx=40, pady=40)
        
        # Logo
        try:
            logo_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "assets", "logo.png")
            logo_image = ctk.CTkImage(light_image=Image.open(logo_path),
                                     dark_image=Image.open(logo_path),
                                     size=(280, 280))
            self.logo_label = ctk.CTkLabel(self.left_side, image=logo_image, text="")
            self.logo_label.pack(pady=(20, 10), anchor="center") # Centered
        except Exception as e:
            self.logo_label = ctk.CTkLabel(self.left_side, text="Rodin Events", font=("Inter", 32, "bold"))
            self.logo_label.pack(pady=(20, 10), anchor="center")

        # Slogan (Centered relative to logo)
        self.slogan_label = ctk.CTkLabel(self.left_side, text="Transformando ideias em\nexperiências memoráveis.", 
                                         font=("Inter", 18), text_color="#E0E0E0", justify="center")
        self.slogan_label.pack(pady=10, anchor="center")

        # --- CENTER LINE ---
        self.sep_line = ctk.CTkFrame(self.main_box, width=2, fg_color="#FF5722")
        self.sep_line.grid(row=0, column=1, sticky="ns", pady=60)

        # --- RIGHT SIDE ---
        self.right_side = ctk.CTkFrame(self.main_box, fg_color="transparent")
        self.right_side.grid(row=0, column=2, sticky="nsew", padx=60, pady=60)
        
        # Login Title
        self.login_title = ctk.CTkLabel(self.right_side, text="Login", font=("Inter", 32, "bold"), text_color="white")
        self.login_title.pack(pady=(0, 40), anchor="w")

        # Email Field
        self.username_entry = ctk.CTkEntry(self.right_side, placeholder_text="E-Mail", 
                                           width=320, height=55, corner_radius=25,
                                           border_width=0, fg_color="#1A1A1A", text_color="white",
                                           placeholder_text_color="#666666", font=("Inter", 14))
        self.username_entry.pack(pady=12)

        # Password Field
        self.password_entry = ctk.CTkEntry(self.right_side, placeholder_text="Passcode", 
                                           show="*", width=320, height=55, corner_radius=25,
                                           border_width=0, fg_color="#1A1A1A", text_color="white",
                                           placeholder_text_color="#666666", font=("Inter", 14))
        self.password_entry.pack(pady=12)

        # Error Message (Hidden)
        self.error_label = ctk.CTkLabel(self.right_side, text="", text_color="#FF4B4B", font=("Inter", 12))
        self.error_label.pack(pady=5)

        # Login Button
        self.login_button = ctk.CTkButton(self.right_side, text="Login", 
                                          command=self.handle_login,
                                          width=200, height=50, corner_radius=25,
                                          fg_color="transparent", border_width=1, border_color="#FF5722",
                                          hover_color="#331100", text_color="#FF5722",
                                          font=("Inter", 16, "bold"))
        self.login_button.pack(pady=(20, 0), anchor="w")


    def handle_login(self):
        username = self.username_entry.get()
        password = self.password_entry.get()
        
        if username == "admin" and password == "admin":
            self.on_login_success()
        else:
            self.error_label.configure(text="Usuário ou senha incorretos")
            # Subtle shake or visual feedback
            self.username_entry.configure(border_width=1, border_color="#FF4B4B")
            self.password_entry.configure(border_width=1, border_color="#FF4B4B")


import customtkinter as ctk
from views.login_view import LoginView
from views.dashboard_view import DashboardView
class RodinEventsApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        
        # Window Setup
        self.title("Rodin Events - Gerenciamento de Eventos")
        self.geometry("1000x700")
        self.configure(fg_color="#121212")
        
        # Appearance
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue") # We will override colors manually for a custom feel
        
        # Current view container
        self.current_view = None
        
        # Show initial screen
        self.show_login()

    def clear_view(self):
        if self.current_view:
            self.current_view.destroy()

    def show_login(self):
        self.clear_view()
        self.current_view = LoginView(self, on_login_success=self.show_dashboard, fg_color="transparent")
        self.current_view.pack(expand=True, fill="both")

    def show_dashboard(self):
        self.clear_view()
        self.current_view = DashboardView(self, on_logout=self.show_login, fg_color="transparent")
        self.current_view.pack(expand=True, fill="both")

if __name__ == "__main__":
    app = RodinEventsApp()
    app.mainloop()

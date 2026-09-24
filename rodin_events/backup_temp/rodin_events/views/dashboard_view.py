import customtkinter as ctk
import json
import os
from datetime import datetime
import calendar
from supabase import create_client, Client

# --- CONFIGURAÇÃO SUPABASE ---
SUPABASE_URL = "https://aycltqfmrzxcdyvsyqdc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y2x0cWZtcnp4Y2R5dnN5cWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzUwMjksImV4cCI6MjA5Mzc1MTAyOX0.POjmm3yHJtgp57OIi9YNZcuUbhzkLBQxu4mMWfNm4as"

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print(f"Erro Supabase: {e}")
    supabase = None

class DashboardView(ctk.CTkFrame):
    def __init__(self, master, on_logout, **kwargs):
        super().__init__(master, **kwargs)
        self.on_logout = on_logout
        self.db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "events_db.json")
        self.load_data()
        self.current_cal_month = datetime.now().month
        self.current_cal_year = datetime.now().year
        
        # Main Layout
        self.grid_columnconfigure(1, weight=1)
        self.grid_rowconfigure(0, weight=1)
        
        # --- SIDEBAR ---
        self.sidebar = ctk.CTkFrame(self, width=220, corner_radius=0, fg_color="#121212")
        self.sidebar.grid(row=0, column=0, sticky="nsew")
        ctk.CTkLabel(self.sidebar, text="RODIN EVENTS", font=("Inter", 20, "bold"), text_color="#FF5722").pack(pady=30)
        
        self.nav_buttons = {}
        nav_items = [("Visão Geral", "🏠"), ("Cronograma", "📅"), ("Financeiro", "💰"), ("Fornecedores", "🤝"), ("Convidados", "👥"), ("Eventos Anteriores", "📁")]
        for name, icon in nav_items:
            btn = ctk.CTkButton(self.sidebar, text=f" {icon}  {name}", anchor="w", fg_color="transparent", hover_color="#333333", height=45,
                               command=lambda n=name: self.switch_tab(n))
            btn.pack(fill="x", padx=10, pady=5)
            self.nav_buttons[name] = btn

        self.logout_btn = ctk.CTkButton(self.sidebar, text=" ✕  Sair", anchor="w", fg_color="transparent", hover_color="#FF4B4B", command=self.on_logout)
        self.logout_btn.pack(side="bottom", fill="x", padx=10, pady=20)

        self.main_area = ctk.CTkFrame(self, fg_color="#0A0A0A", corner_radius=0)
        self.main_area.grid(row=0, column=1, sticky="nsew")
        self.switch_tab("Visão Geral")

    def load_data(self):
        if not supabase: 
            self.events_data = {"active": [], "past": []}
            return
        try:
            # Buscar eventos ativos
            active_res = supabase.table("events").select("*").eq("status", "Ativo").execute()
            # Buscar eventos passados
            past_res = supabase.table("events").select("*").neq("status", "Ativo").execute()
            self.events_data = {"active": active_res.data, "past": past_res.data}
        except Exception as e:
            print(f"Erro Supabase: {e}")
            self.events_data = {"active": [], "past": []}

    def save_data(self):
        with open(self.db_path, "w", encoding="utf-8") as f:
            json.dump(self.events_data, f, ensure_ascii=False, indent=4)

    def switch_tab(self, tab_name):
        self.current_tab = tab_name
        for name, btn in self.nav_buttons.items():
            btn.configure(fg_color="#FF5722" if name == tab_name else "transparent")
        for widget in self.main_area.winfo_children(): widget.destroy()
        if tab_name == "Visão Geral": self.render_visao_geral()
        elif tab_name == "Cronograma": self.render_cronograma()
        elif tab_name == "Eventos Anteriores": self.render_past_events()
        else: ctk.CTkLabel(self.main_area, text=tab_name, font=("Inter", 32, "bold")).pack(pady=100)

    def render_visao_geral(self):
        header = ctk.CTkFrame(self.main_area, fg_color="transparent")
        header.pack(fill="x", padx=30, pady=20)
        ctk.CTkLabel(header, text="Visão Geral", font=("Inter", 24, "bold")).pack(side="left")
        ctk.CTkButton(header, text="+ Novo Evento", fg_color="#FF5722", hover_color="#E64A19", command=self.show_create_form).pack(side="right")
        metrics_frame = ctk.CTkScrollableFrame(self.main_area, orientation="horizontal", height=130, fg_color="transparent")
        metrics_frame.pack(fill="x", padx=30, pady=10)
        active_list = self.events_data["active"]
        self.create_mini_metric(metrics_frame, "Total Ativos", str(len(active_list)), "#FF5722").pack(side="left", padx=10)
        for ev in sorted(active_list, key=lambda x: x["date"]):
            try:
                ev_date = datetime.strptime(ev["date"], "%d/%m/%Y %H:%M")
                delta = ev_date - datetime.now()
                self.create_mini_metric(metrics_frame, f"Faltam para {ev['name']}", f"{delta.days} dias", "#2196F3").pack(side="left", padx=10)
            except: pass
        self.cards_scroll = ctk.CTkScrollableFrame(self.main_area, fg_color="transparent")
        self.cards_scroll.pack(fill="both", expand=True, padx=30, pady=10)
        self.cards_scroll.columnconfigure((0, 1, 2), weight=1)
        self.refresh_cards()

    def refresh_cards(self):
        for widget in self.cards_scroll.winfo_children(): widget.destroy()
        for i, ev in enumerate(self.events_data["active"]):
            card = self.create_event_card(self.cards_scroll, ev)
            card.grid(row=i // 3, column=i % 3, padx=10, pady=10, sticky="nsew")

    def create_mini_metric(self, parent, title, value, color):
        frame = ctk.CTkFrame(parent, width=200, height=80, fg_color="#161B22", corner_radius=10)
        ctk.CTkFrame(frame, width=3, fg_color=color).pack(side="left", fill="y", padx=(10, 0), pady=15)
        txt_frame = ctk.CTkFrame(frame, fg_color="transparent")
        txt_frame.pack(side="left", padx=15, pady=15)
        ctk.CTkLabel(txt_frame, text=title, font=("Inter", 11), text_color="#A0A0A0").pack(anchor="w")
        ctk.CTkLabel(txt_frame, text=value, font=("Inter", 18, "bold")).pack(anchor="w")
        return frame

    def create_event_card(self, parent, event):
        card = ctk.CTkFrame(parent, fg_color="#1A1A1A", corner_radius=15, border_width=1, border_color="#333")
        card.grid_columnconfigure(0, weight=1)
        ctk.CTkFrame(card, height=4, fg_color="#FF5722", corner_radius=2).grid(row=0, column=0, sticky="ew", padx=15, pady=(10, 0))
        ctk.CTkLabel(card, text=event["name"], font=("Inter", 16, "bold")).grid(row=1, column=0, sticky="w", padx=20, pady=(10, 0))
        ctk.CTkLabel(card, text=f"📍 {event['location']}", font=("Inter", 12), text_color="#A0A0A0").grid(row=2, column=0, sticky="w", padx=20)
        ctk.CTkLabel(card, text=f"📅 {event['date']}", font=("Inter", 12), text_color="#A0A0A0").grid(row=3, column=0, sticky="w", padx=20, pady=(0, 15))
        card.bind("<Button-1>", lambda e: self.show_event_details(event))
        for child in card.winfo_children(): child.bind("<Button-1>", lambda e: self.show_event_details(event))
        return card

    def show_event_details(self, event):
        self.detail_overlay = ctk.CTkFrame(self, fg_color="rgba(0,0,0,0.9)")
        self.detail_overlay.place(relx=0, rely=0, relwidth=1, relheight=1)
        box = ctk.CTkScrollableFrame(self.detail_overlay, width=600, height=700, fg_color="#161B22", corner_radius=20)
        box.place(relx=0.5, rely=0.5, anchor="center")
        ctk.CTkLabel(box, text=f"Detalhes: {event['name']}", font=("Inter", 24, "bold"), text_color="#FF5722").pack(pady=20)
        self.create_calendar_view(box).pack(pady=10, padx=20, fill="x")
        details = [("Local", event['location']), ("Data/Hora", event['date']), ("Organizador", event['org'])]
        for k, v in details:
            f = ctk.CTkFrame(box, fg_color="transparent")
            f.pack(fill="x", padx=40, pady=5)
            ctk.CTkLabel(f, text=f"{k}:", font=("Inter", 12, "bold"), text_color="#A0A0A0").pack(side="left")
            ctk.CTkLabel(f, text=v, font=("Inter", 14)).pack(side="right")
        ctk.CTkButton(box, text="Evento Concluído", fg_color="#4CAF50", height=40, command=lambda: self.move_event(event, "Concluído")).pack(fill="x", padx=40, pady=(20, 5))
        ctk.CTkButton(box, text="Cancelar Evento", fg_color="#FF4B4B", height=40, command=lambda: self.move_event(event, "Cancelado")).pack(fill="x", padx=40, pady=5)
        ctk.CTkButton(box, text="Fechar", fg_color="transparent", border_width=1, command=self.detail_overlay.place_forget).pack(fill="x", padx=40, pady=(5, 20))

    def create_calendar_view(self, parent):
        frame = ctk.CTkFrame(parent, fg_color="#0D0D0D", corner_radius=15, border_width=1, border_color="#333")
        ctk.CTkLabel(frame, text="Calendário do Evento", font=("Inter", 14, "bold")).pack(pady=10)
        grid = ctk.CTkFrame(frame, fg_color="transparent")
        grid.pack(pady=10, padx=10)
        days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
        for i, d in enumerate(days): ctk.CTkLabel(grid, text=d, font=("Inter", 10), text_color="#666").grid(row=0, column=i, padx=5)
        for r in range(1, 6):
            for c in range(7):
                day_num = (r-1)*7 + c + 1
                if day_num <= 31:
                    lbl = ctk.CTkLabel(grid, text=str(day_num), width=35, height=35, corner_radius=5)
                    if day_num == 15: lbl.configure(fg_color="#FF5722", text_color="white")
                    lbl.grid(row=r, column=c, padx=2, pady=2)
        return frame

    def render_cronograma(self):
        scroll = ctk.CTkScrollableFrame(self.main_area, fg_color="transparent")
        scroll.pack(fill="both", expand=True, padx=30, pady=20)
        header = ctk.CTkFrame(scroll, fg_color="transparent")
        header.pack(fill="x", pady=(0, 20))
        ctk.CTkLabel(header, text="Cronograma Geral", font=("Inter", 28, "bold")).pack(side="left")
        ctk.CTkButton(header, text="+", width=30, height=30, fg_color="#FF5722", font=("Inter", 18)).pack(side="right", padx=5)
        ctk.CTkLabel(header, text="🔍", font=("Inter", 18)).pack(side="right", padx=5)
        
        top_split = ctk.CTkFrame(scroll, fg_color="transparent")
        top_split.pack(fill="x", pady=10)
        top_split.columnconfigure(0, weight=2); top_split.columnconfigure(1, weight=1)
        
        cal_box = ctk.CTkFrame(top_split, fg_color="#161B22", corner_radius=15)
        cal_box.grid(row=0, column=0, sticky="nsew", padx=(0, 10))
        cal_nav = ctk.CTkFrame(cal_box, fg_color="transparent")
        cal_nav.pack(fill="x", pady=10, padx=20)
        ctk.CTkButton(cal_nav, text="<", width=30, fg_color="#333", command=self.prev_month).pack(side="left")
        self.cal_month_lbl = ctk.CTkLabel(cal_nav, text=f"{calendar.month_name[self.current_cal_month]} {self.current_cal_year}", font=("Inter", 16, "bold"))
        self.cal_month_lbl.pack(side="left", expand=True)
        ctk.CTkButton(cal_nav, text=">", width=30, fg_color="#333", command=self.next_month).pack(side="right")
        self.cal_grid_container = ctk.CTkFrame(cal_box, fg_color="transparent")
        self.cal_grid_container.pack(pady=10, padx=10); self.update_cronograma_cal()

        team_box = ctk.CTkFrame(top_split, fg_color="#161B22", corner_radius=15)
        team_box.grid(row=0, column=1, sticky="nsew")
        ctk.CTkLabel(team_box, text="Gestão de Equipe", font=("Inter", 16, "bold")).pack(pady=10)
        team_table = ctk.CTkFrame(team_box, fg_color="transparent")
        team_table.pack(fill="x", padx=10)
        headers = ["Membro", "Função"]; data = [("João", "Limpeza"), ("Maria", "Som"), ("Pedro", "Coord")]
        for i, h in enumerate(headers): ctk.CTkLabel(team_table, text=h, font=("Inter", 10, "bold"), text_color="#FF5722").grid(row=0, column=i, padx=5, sticky="w")
        for r, (m, f) in enumerate(data, 1):
            ctk.CTkLabel(team_table, text=m, font=("Inter", 10)).grid(row=r, column=0, padx=5, sticky="w")
            ctk.CTkLabel(team_table, text=f, font=("Inter", 10), text_color="#A0A0A0").grid(row=r, column=1, padx=5, sticky="w")

        ctk.CTkLabel(scroll, text="Cronograma Detalhado", font=("Inter", 20, "bold")).pack(anchor="w", pady=(30, 10))
        table_frame = ctk.CTkFrame(scroll, fg_color="#161B22", corner_radius=15, border_width=1, border_color="#333")
        table_frame.pack(fill="x", pady=10)
        headers = ["Horário", "Atividade", "Responsável"]
        for i, h in enumerate(headers): ctk.CTkLabel(table_frame, text=h, font=("Inter", 12, "bold"), text_color="#FF5722").grid(row=0, column=i, padx=20, pady=10, sticky="w")
        for r in range(1, 6):
            ctk.CTkEntry(table_frame, width=80, placeholder_text="00:00", fg_color="#0D0D0D", border_width=0).grid(row=r, column=0, padx=10, pady=5)
            ctk.CTkEntry(table_frame, width=300, placeholder_text="Descrição...", fg_color="#0D0D0D", border_width=0).grid(row=r, column=1, padx=10, pady=5)
            ctk.CTkEntry(table_frame, width=150, placeholder_text="Nome", fg_color="#0D0D0D", border_width=0).grid(row=r, column=2, padx=10, pady=5)

    def prev_month(self):
        self.current_cal_month -= 1
        if self.current_cal_month == 0: self.current_cal_month = 12; self.current_cal_year -= 1
        self.update_cronograma_cal()
    def next_month(self):
        self.current_cal_month += 1
        if self.current_cal_month == 13: self.current_cal_month = 1; self.current_cal_year += 1
        self.update_cronograma_cal()
    def update_cronograma_cal(self):
        for w in self.cal_grid_container.winfo_children(): w.destroy()
        self.cal_month_lbl.configure(text=f"{calendar.month_name[self.current_cal_month]} {self.current_cal_year}")
        days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
        for i, d in enumerate(days): ctk.CTkLabel(self.cal_grid_container, text=d, font=("Inter", 10), text_color="#666").grid(row=0, column=i, padx=5)
        cal = calendar.monthcalendar(self.current_cal_year, self.current_cal_month)
        for r, week in enumerate(cal, 1):
            for c, day in enumerate(week):
                if day != 0: ctk.CTkLabel(self.cal_grid_container, text=str(day), width=35, height=35, corner_radius=5).grid(row=r, column=c, padx=2, pady=2)

    def move_event(self, event, status):
        if not supabase: return
        try:
            supabase.table("events").update({"status": status}).eq("id", event["id"]).execute()
            self.detail_overlay.place_forget(); self.switch_tab("Visão Geral")
        except Exception as e: print(f"Erro ao mover evento: {e}")

    def render_past_events(self):
        scroll = ctk.CTkScrollableFrame(self.main_area, fg_color="transparent")
        scroll.pack(fill="both", expand=True, padx=30, pady=30)
        for ev in self.events_data["past"]:
            f = ctk.CTkFrame(scroll, fg_color="#1A1A1A", corner_radius=15, border_width=1, border_color="#333")
            f.pack(fill="x", pady=10, padx=10)
            status_color = "#4CAF50" if ev["status"] == "Concluído" else "#FF4B4B"
            ctk.CTkFrame(f, height=4, fg_color=status_color).pack(fill="x", padx=15, pady=(10, 0))
            txt = ctk.CTkFrame(f, fg_color="transparent"); txt.pack(fill="x", padx=20, pady=15)
            ctk.CTkLabel(txt, text=ev["name"], font=("Inter", 16, "bold")).pack(anchor="w")
            ctk.CTkLabel(txt, text=f"📅 {ev['date']}", font=("Inter", 12), text_color="#A0A0A0").pack(anchor="w")
            ctk.CTkLabel(txt, text=f"• Evento {ev['status']}", font=("Inter", 11, "bold"), text_color=status_color).pack(anchor="w", pady=(5, 0))

    def show_create_form(self):
        self.form_overlay = ctk.CTkFrame(self, fg_color="rgba(0,0,0,0.8)")
        self.form_overlay.place(relx=0, rely=0, relwidth=1, relheight=1)
        form_box = ctk.CTkFrame(self.form_overlay, width=500, fg_color="#1A1A1A", corner_radius=20, border_width=1, border_color="#333")
        form_box.place(relx=0.5, rely=0.5, anchor="center")
        ctk.CTkLabel(form_box, text="Criar Novo Evento", font=("Inter", 24, "bold"), text_color="white").pack(pady=30)
        self.entry_name = self.create_input(form_box, "Nome do Evento")
        self.entry_location = self.create_input(form_box, "Onde será o evento?")
        self.entry_date = self.create_input(form_box, "Data e Hora (DD/MM/AAAA HH:MM)")
        self.entry_org = self.create_input(form_box, "Organizado por:")
        ctk.CTkButton(form_box, text="Salvar Evento", command=self.save_event, width=300, height=45, fg_color="#FF5722", hover_color="#E64A19").pack(pady=20)
        ctk.CTkButton(form_box, text="Cancelar", command=self.form_overlay.place_forget, width=300, height=45, fg_color="transparent", border_width=1).pack(pady=10)

    def create_input(self, parent, placeholder):
        entry = ctk.CTkEntry(parent, placeholder_text=placeholder, width=400, height=45, corner_radius=10, border_color="#111111", fg_color="#0D0D0D")
        entry.pack(pady=10); return entry

    def save_event(self):
        if not supabase: return
        n, l, d, o = self.entry_name.get(), self.entry_location.get(), self.entry_date.get(), self.entry_org.get()
        if n and d:
            try:
                supabase.table("events").insert({"name": n, "location": l, "date": d, "org": o, "status": "Ativo"}).execute()
                self.form_overlay.place_forget(); self.switch_tab("Visão Geral")
            except Exception as e: print(f"Erro ao salvar: {e}")

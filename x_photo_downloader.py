#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
X / TWITTER  MEDIA  HARVESTER  v5.0
Backend: gallery-dl  |  Parallel 2x  |  150 photo limit  |  Photos only
"""

import sys, os, subprocess, re, threading, time, queue
from datetime import datetime

# ════════════════════════════════════════════════════════════════════════════
# ANSI PALETTE
# ════════════════════════════════════════════════════════════════════════════

R  = "\033[0m"
B  = "\033[1m"
DM = "\033[2m"
IT = "\033[3m"

K  = "\033[30m"   # black
GR = "\033[31m"   # red
GN = "\033[32m"   # green
YL = "\033[33m"   # yellow
BL = "\033[34m"   # blue
MG = "\033[35m"   # magenta
CY = "\033[36m"   # cyan
WH = "\033[37m"   # white

bGR = "\033[91m"  # bright red
bGN = "\033[92m"  # bright green
bYL = "\033[93m"  # bright yellow
bBL = "\033[94m"  # bright blue
bMG = "\033[95m"  # bright magenta
bCY = "\033[96m"  # bright cyan
bWH = "\033[97m"  # bright white

GRY = "\033[90m"  # dark gray

BGN = "\033[42m"  # bg green
BRD = "\033[41m"  # bg red
BBL = "\033[44m"  # bg blue
BCY = "\033[46m"  # bg cyan

# ════════════════════════════════════════════════════════════════════════════
# CONFIG
# ════════════════════════════════════════════════════════════════════════════

COOKIES_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "x_cookies.txt")
OUTPUT_ROOT  = os.path.join(os.path.dirname(os.path.abspath(__file__)), "x_downloads")
MAX_PARALLEL = 2      # concurrent downloads at once (2 = stable, queue handles the rest)
PHOTO_LIMIT  = 150    # max photos per member
W            = 76     # terminal width

_lock = threading.Lock()

def out(text="", end="\n"):
    with _lock:
        sys.stdout.write(text + end)
        sys.stdout.flush()

def clr():
    with _lock:
        sys.stdout.write("\r\033[K")
        sys.stdout.flush()

# ════════════════════════════════════════════════════════════════════════════
# VISUAL COMPONENTS
# ════════════════════════════════════════════════════════════════════════════

def ts():
    return datetime.now().strftime("%H:%M:%S")

def box_top(w=W):
    return f"{CY}{B}╔{'═'*(w-2)}╗{R}"

def box_bot(w=W):
    return f"{CY}{B}╚{'═'*(w-2)}╝{R}"

def box_mid(w=W):
    return f"{CY}╠{'═'*(w-2)}╣{R}"

def box_row(text, w=W, color=bWH):
    raw = re.sub(r'\033\[[0-9;]*m', '', text)
    pad = max(0, w - 2 - len(raw))
    return f"{CY}║{R}{color}{text}{' '*pad}{R}{CY}║{R}"

def div(char="─", w=W, color=GRY):
    return f"{color}{char*w}{R}"

def tag(label, bg, fg=K):
    return f"{bg}{B}{fg} {label} {R}"

def OK():   return tag(" OK ", BGN, K)
def ERR():  return tag("ERR!", BRD, bWH)
def SKP():  return f"{GRY}[ -- ]{R}"
def GET():  return f"{YL}{B}[GET]{R}"
def INF():  return f"{CY}[INF]{R}"
def WRN():  return f"{bYL}[WRN]{R}"
def ACT():  return f"{bCY}{B}[ACT]{R}"
def QUE():  return f"{GRY}[QUE]{R}"
def DNE():  return f"{bGN}{B}[END]{R}"

def stamp():
    return f"{GRY}[{ts()}]{R}"

def mem_tag(username):
    return f"{B}{bMG}@{username}{R}"

def fmt_size(path):
    try:
        b = os.path.getsize(path)
        if b >= 1_048_576: return f"{bCY}{b/1_048_576:>6.1f}MB{R}"
        return f"{bCY}{b/1024:>6.0f}KB{R}"
    except: return f"{GRY}  ???{R}"

def fmt_fname(fname, maxlen=44):
    s = fname if len(fname) <= maxlen else fname[:maxlen-3]+"..."
    return f"{bWH}{s:<{maxlen}}{R}"

def progress_bar(current, total, width=20):
    if total <= 0: return ""
    filled = min(int(width * current / total), width)
    bar    = f"{bGN}{'█'*filled}{R}{GRY}{'░'*(width-filled)}{R}"
    pct    = int(100 * current / total)
    return f"{bar} {bWH}{B}{pct:3d}%{R}"

# ════════════════════════════════════════════════════════════════════════════
# BANNER
# ════════════════════════════════════════════════════════════════════════════

def banner():
    os.system("cls" if os.name == "nt" else "clear")

    # Top decorative line
    out(f"{GRY}{'·'*W}{R}")
    out()

    out(box_top())

    # Title
    title1 = f"  X  /  TWITTER  MEDIA  HARVESTER"
    title2 = f"  v5.0  //  gallery-dl  //  parallel={MAX_PARALLEL}  //  limit={PHOTO_LIMIT} photos"
    out(box_row(f"{B}{bCY}{title1}{R}"))
    out(box_row(f"{GRY}{title2}{R}"))

    out(box_mid())
    out(box_row(f"  {GRY}Started at  {R}{bWH}{datetime.now().strftime('%Y-%m-%d  %H:%M:%S')}{R}"))
    out(box_row(f"  {GRY}Output      {R}{GRY}{OUTPUT_ROOT}{R}"))
    out(box_row(f"  {GRY}Filter      {R}{bYL}jpg  jpeg  png  webp{R}{GRY}  (video excluded){R}"))
    out(box_row(f"  {GRY}Rate limit  {R}{GRY}2.0s / page  +  1.5s / request{R}"))
    out(box_row(f"  {GRY}Limit       {R}{bWH}{PHOTO_LIMIT} photos per member{R}{GRY}  (--range 1-{PHOTO_LIMIT}){R}"))
    out(box_bot())
    out()

# ════════════════════════════════════════════════════════════════════════════
# PREFLIGHT
# ════════════════════════════════════════════════════════════════════════════

def check_gallery_dl():
    try:
        r = subprocess.run(["gallery-dl","--version"],capture_output=True,text=True,timeout=5)
        ver = r.stdout.strip()
        out(f"  {stamp()}  {INF()}  gallery-dl {B}{bWH}{ver}{R}  {bGN}ready{R}")
        return True
    except FileNotFoundError:
        out(f"  {stamp()}  {WRN()}  gallery-dl not found — installing...")
        try:
            subprocess.run([sys.executable,"-m","pip","install","-U","gallery-dl","-q"],check=True)
            out(f"  {stamp()}  {OK()}  gallery-dl installed")
            return True
        except Exception as e:
            out(f"  {stamp()}  {ERR()}  {bGR}installation failed: {e}{R}")
            return False

def check_cookies():
    if not os.path.exists(COOKIES_FILE):
        out(f"""
  {ERR()}  {bGR}Cookies file not found{R}

  {B}Required path:{R}
    {bYL}{COOKIES_FILE}{R}

  {B}Setup:{R}
    1. Install Chrome/Edge extension  {CY}"Get cookies.txt LOCALLY"{R}
    2. Open  {CY}https://x.com{R}  and confirm login
    3. Click extension icon  ->  {B}[ Export ]{R}
    4. Save as  {bYL}x_cookies.txt{R}  in this directory
    5. Re-run this script
""")
        return False

    size = os.path.getsize(COOKIES_FILE)
    with open(COOKIES_FILE,encoding="utf-8",errors="ignore") as f:
        s = f.read(2000)
    if size < 100 or (".x.com" not in s and "twitter.com" not in s):
        out(f"  {stamp()}  {ERR()}  {bGR}cookies appear invalid or expired — re-export{R}")
        return False

    out(f"  {stamp()}  {OK()}  cookies.txt  {GRY}{size:,} bytes{R}  {bGN}valid{R}")
    return True

# ════════════════════════════════════════════════════════════════════════════
# INPUT
# ════════════════════════════════════════════════════════════════════════════

def parse_username(raw):
    raw = raw.strip()
    if "x.com/" in raw or "twitter.com/" in raw:
        m = re.search(r'(?:x|twitter)\.com/([A-Za-z0-9_]+)', raw)
        if m: return m.group(1)
    return raw.lstrip("@").strip()

# ════════════════════════════════════════════════════════════════════════════
# MEMBER STATE TRACKER  (for the live dashboard)
# ════════════════════════════════════════════════════════════════════════════

class MemberState:
    def __init__(self, username):
        self.username    = username
        self.status      = "QUEUED"   # QUEUED | ACTIVE | DONE | ERROR
        self.downloaded  = 0
        self.skipped     = 0
        self.errors      = 0
        self.start_time  = None
        self.end_time    = None

    def elapsed(self):
        if not self.start_time: return 0
        end = self.end_time or time.time()
        return int(end - self.start_time)

# ════════════════════════════════════════════════════════════════════════════
# DOWNLOAD WORKER
# ════════════════════════════════════════════════════════════════════════════

def download_member(state: MemberState, log_queue: queue.Queue):
    username   = state.username
    url        = f"https://x.com/{username}/media"
    member_dir = os.path.join(OUTPUT_ROOT, username)
    os.makedirs(member_dir, exist_ok=True)
    norm_dir   = member_dir.replace("\\","/").lower()

    state.status     = "ACTIVE"
    state.start_time = time.time()

    def push(kind, msg, path=None):
        log_queue.put({"user": username, "kind": kind, "msg": msg,
                       "path": path, "time": ts()})

    cmd = [
        "gallery-dl",
        "-C", COOKIES_FILE,
        "--filter", "extension in ('jpg','jpeg','png','webp')",
        "--range", f"1-{PHOTO_LIMIT}",   # HARD LIMIT
        "--dest", member_dir,
        "--no-mtime",
        "--retries", "3",
        "--sleep", "2.0",
        "--sleep-request", "1.5",
        url,
    ]

    push("start", f"ACTIVE  ->  {url}")

    try:
        proc = subprocess.Popen(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            text=True, bufsize=1, encoding="utf-8", errors="replace"
        )
        for raw in proc.stdout:
            line = raw.strip()
            if not line: continue
            norm = line.replace("\\","/").lower()

            if norm_dir in norm and any(norm.endswith(e) for e in (".jpg",".jpeg",".png",".webp")):
                state.downloaded += 1
                push("ok", os.path.basename(line), path=line)

            elif "[skip]" in norm or "skipping" in norm:
                state.skipped += 1
                push("skip", line.split()[-1][:60] if line.split() else line)

            elif "[error]" in norm:
                state.errors += 1
                push("err", line[line.lower().find("[error]")+7:].strip()[:70])

            elif "[warning]" in norm:
                msg = line[line.lower().find("[warning]")+9:].strip()[:70]
                push("warn", msg)

            elif "[twitter]" in norm or "[info]" in norm:
                msg = re.sub(r'\[.*?\]','',line).strip()[:70]
                if msg: push("get", msg)

        proc.wait()

    except KeyboardInterrupt:
        proc.terminate()
        push("warn", "stopped by interrupt")

    # recount from disk
    actual = [f for f in os.listdir(member_dir)
              if f.lower().endswith(('.jpg','.jpeg','.png','.webp'))]
    state.downloaded = len(actual)
    state.status     = "DONE" if state.errors == 0 else "ERROR"
    state.end_time   = time.time()

    push("done", f"COMPLETE  {state.downloaded} photos  {state.elapsed()}s")

# ════════════════════════════════════════════════════════════════════════════
# LIVE DASHBOARD LINE  (single overwriting line showing all member states)
# ════════════════════════════════════════════════════════════════════════════

def dashboard_line(states: list):
    parts = []
    for s in states:
        if s.status == "QUEUED":
            parts.append(f"{GRY}@{s.username}:{R}{GRY}queued{R}")
        elif s.status == "ACTIVE":
            parts.append(f"{bCY}@{s.username}:{R}{bGN}{B}{s.downloaded}{R}{GRY}dl{R} {bYL}{s.elapsed()}s{R}")
        elif s.status == "DONE":
            parts.append(f"{bGN}@{s.username}:{R}{bGN}{B}{s.downloaded}{R}{GRY}done{R}")
        else:
            parts.append(f"{bGR}@{s.username}:{R}{bGR}err{R}")
    line = "  " + "  |  ".join(parts)
    with _lock:
        sys.stdout.write(f"\r\033[K{line}")
        sys.stdout.flush()

# ════════════════════════════════════════════════════════════════════════════
# LOG CONSUMER
# ════════════════════════════════════════════════════════════════════════════

def render_event(ev):
    kind = ev["kind"]
    user = ev["user"]
    msg  = ev["msg"]
    path = ev.get("path","")
    t    = f"{GRY}[{ev['time']}]{R}"
    u    = f"{DM}{GRY}@{user:<20}{R}"

    if kind == "ok":
        fname = os.path.basename(path) if path else msg
        sz    = fmt_size(path) if path else ""
        out(f"  {t}  {OK()}  {fmt_fname(fname)}  {sz}  {u}")

    elif kind == "skip":
        out(f"  {t}  {SKP()}  {GRY}{msg:<44}{R}  {u}")

    elif kind == "err":
        out(f"  {t}  {ERR()}  {bGR}{msg:<44}{R}  {u}")

    elif kind == "warn":
        out(f"  {t}  {WRN()}  {bYL}{msg[:60]}{R}  {u}")

    elif kind == "get":
        out(f"  {t}  {GET()}  {YL}{msg[:60]}{R}  {u}")

    elif kind == "start":
        out()
        out(div("─"))
        out(f"  {t}  {ACT()}  {mem_tag(user)}")
        out(f"  {' '*12}  {GRY}url  ->  https://x.com/{user}/media{R}")
        out(f"  {' '*12}  {GRY}out  ->  {OUTPUT_ROOT}\\{user}\\{R}")
        out(f"  {' '*12}  {GRY}lmt  ->  max {PHOTO_LIMIT} photos  (--range 1-{PHOTO_LIMIT}){R}")
        out(div("·"))
        out(f"  {GRY}{'TIMESTAMP':^10}  {'STATUS':^6}  {'FILENAME':<44}  {'SIZE':>8}  {'MEMBER':<22}{R}")
        out(div("·"))

    elif kind == "done":
        out(div("·"))
        out(f"  {t}  {DNE()}  {mem_tag(user)}  {GRY}{msg}{R}")
        out(div("─"))

def consume_queue(q, active_ev, states):
    while active_ev.is_set() or not q.empty():
        try:
            ev = q.get(timeout=0.15)
            # clear dashboard line before printing
            with _lock:
                sys.stdout.write("\r\033[K")
            render_event(ev)
            # redraw dashboard after
            dashboard_line(states)
        except queue.Empty:
            # just redraw dashboard
            dashboard_line(states)

# ════════════════════════════════════════════════════════════════════════════
# PARALLEL RUNNER
# ════════════════════════════════════════════════════════════════════════════

def run_all(usernames):
    states    = {u: MemberState(u) for u in usernames}
    state_list= list(states.values())
    log_q     = queue.Queue()
    active_ev = threading.Event()
    active_ev.set()
    results   = {}

    consumer = threading.Thread(
        target=consume_queue, args=(log_q, active_ev, state_list), daemon=True
    )
    consumer.start()

    sem = threading.Semaphore(MAX_PARALLEL)

    def worker(uname):
        with sem:
            download_member(states[uname], log_q)
            results[uname] = states[uname]

    threads = []
    for i, u in enumerate(usernames):
        t = threading.Thread(target=worker, args=(u,), daemon=True)
        threads.append(t)
        t.start()
        # stagger start to avoid simultaneous auth requests
        if i < len(usernames) - 1:
            time.sleep(1.5)

    for t in threads:
        t.join()

    active_ev.clear()
    consumer.join()

    # clear dashboard line
    with _lock:
        sys.stdout.write("\r\033[K")
        sys.stdout.flush()

    return results

# ════════════════════════════════════════════════════════════════════════════
# SESSION SUMMARY
# ════════════════════════════════════════════════════════════════════════════

def show_summary(results):
    out()
    out(box_top())
    out(box_row(f"  {B}{bWH}SESSION  SUMMARY{R}"))
    out(box_mid())

    total_dl = 0
    for u, s in results.items():
        dl   = s.downloaded
        err  = s.errors
        skp  = s.skipped
        dur  = f"{s.elapsed()}s"
        total_dl += dl

        status_col = f"{bGN}DONE{R}" if s.status == "DONE" else f"{bGR}ERROR{R}"
        bar = progress_bar(min(dl, PHOTO_LIMIT), PHOTO_LIMIT, width=16)

        row = (
            f"  {bMG}@{u:<24}{R}  "
            f"{bar}  "
            f"{bGN}{B}{dl:>4}{R}{GRY} photos{R}  "
            f"{GRY}{dur:>5}  {R}"
            f"{status_col}"
        )
        out(box_row(row, color=""))

    out(box_mid())
    total_row = f"  {'TOTAL':<26}  {B}{bWH}{total_dl:>4} photos{R}  across {len(results)} member(s)"
    out(box_row(total_row, color=""))
    out(box_bot())
    out()
    out(f"  {GRY}Output  :  {OUTPUT_ROOT}{R}")
    out()

# ════════════════════════════════════════════════════════════════════════════
# MAIN
# ════════════════════════════════════════════════════════════════════════════

def main():
    banner()

    # Preflight
    out(f"  {B}PREFLIGHT{R}")
    out(div())
    if not check_gallery_dl(): sys.exit(1)
    if not check_cookies():
        input("\n  Press Enter to exit...")
        sys.exit(1)
    out(div())
    out()

    # Queue targets
    out(f"  {B}TARGET QUEUE{R}  {GRY}(max {MAX_PARALLEL} run parallel, 3rd queued — waits its turn){R}")
    out(div())
    out(f"  {GRY}Input: username / @user / full URL.  Type  {R}{B}run{R}{GRY}  to start.  {R}{B}done{R}{GRY}  to exit.{R}")
    out()

    targets = []

    while True:
        try:
            idx = len(targets)+1
            raw = input(f"  {B}{CY}[{idx:02d}] target >{R} ").strip()
        except (EOFError, KeyboardInterrupt):
            break

        if not raw or raw.lower() in ("done","exit","quit","q"):
            break

        if raw.lower() == "run":
            if not targets: out(f"  {WRN()}  nothing queued"); continue
            break

        u = parse_username(raw)
        if not u or not re.match(r'^[A-Za-z0-9_]{1,50}$', u):
            out(f"  {ERR()}  {bGR}invalid username{R}"); continue
        if u in targets:
            out(f"  {WRN()}  {bYL}@{u} already in queue{R}"); continue

        targets.append(u)
        out(f"  {OK()}  queued  {mem_tag(u)}  {GRY}(slot {idx}){R}")

    if not targets:
        out(f"\n  {GRY}No targets.  Exiting.{R}\n")
        return

    # Confirm
    out()
    out(div("═"))
    out(f"  {B}DOWNLOAD QUEUE{R}  {GRY}({len(targets)} member(s)  //  {MAX_PARALLEL} parallel  //  limit {PHOTO_LIMIT}/member){R}")
    out(div("─"))
    for i, u in enumerate(targets, 1):
        run_label = ACT() if i <= MAX_PARALLEL else QUE()
        out(f"  {GRY}[{i:02d}]{R}  {run_label}  {mem_tag(u)}  {GRY}->  x_downloads/{u}/{R}")
    out(div("═"))
    out()

    try:
        ok = input(f"  {B}Start all downloads? (y/n): {R}").strip().lower()
    except KeyboardInterrupt:
        return

    if ok != "y":
        out(f"  {GRY}Aborted.{R}\n")
        return

    out()
    out(f"  {stamp()}  {INF()}  launching {len(targets)} thread(s)  //  {MAX_PARALLEL} active  //  rest queued")
    out()

    session_start = time.time()
    results = run_all(targets)
    elapsed = round(time.time() - session_start, 1)

    out()
    out(f"  {stamp()}  {INF()}  {bGN}all threads finished  //  total session time: {elapsed}s{R}")

    show_summary(results)


if __name__ == "__main__":
    main()

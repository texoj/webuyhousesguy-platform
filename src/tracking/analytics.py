import os
import json
from datetime import datetime
from typing import Dict, List

class Analytics:
    def __init__(self):
        self.data_dir = 'data/analytics'
        os.makedirs(self.data_dir, exist_ok=True)
        self.current_sessions = {}

    def track_pageview(self, user_id: str, page_data: Dict):
        """Track individual pageview"""
        timestamp = datetime.now().isoformat()
        data = {
            'timestamp': timestamp,
            'user_id': user_id,
            **page_data
        }
        
        # Save to daily log
        date_str = datetime.now().strftime('%Y-%m-%d')
        log_file = os.path.join(self.data_dir, f'pageviews_{date_str}.json')
        
        with open(log_file, 'a') as f:
            f.write(json.dumps(data) + '\n')

    def track_conversion(self, user_id: str, conversion_data: Dict):
        """Track conversion event"""
        timestamp = datetime.now().isoformat()
        data = {
            'timestamp': timestamp,
            'user_id': user_id,
            **conversion_data
        }
        
        # Save to conversions log
        log_file = os.path.join(self.data_dir, 'conversions.json')
        
        with open(log_file, 'a') as f:
            f.write(json.dumps(data) + '\n')

    def track_session(self, user_id: str, session_data: Dict):
        """Track user session"""
        if user_id not in self.current_sessions:
            self.current_sessions[user_id] = {
                'start_time': datetime.now().isoformat(),
                'pages': []
            }
        
        self.current_sessions[user_id]['pages'].append(session_data)

    def end_session(self, user_id: str):
        """End user session and save data"""
        if user_id in self.current_sessions:
            session = self.current_sessions[user_id]
            session['end_time'] = datetime.now().isoformat()
            
            # Save session data
            log_file = os.path.join(self.data_dir, 'sessions.json')
            
            with open(log_file, 'a') as f:
                f.write(json.dumps(session) + '\n')
            
            del self.current_sessions[user_id]

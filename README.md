# Zperiod

A comprehensive period tracking application designed to help users monitor and manage their menstrual cycle with ease and privacy.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

### Core Functionality
- 📅 **Period Tracking** - Log your period dates and duration with ease
- 📊 **Cycle Analytics** - View detailed statistics about your menstrual cycle patterns
- 🔔 **Smart Notifications** - Receive timely reminders for upcoming periods and fertile windows
- 📝 **Symptom Logging** - Track symptoms, mood, and physical indicators throughout your cycle
- 🎯 **Fertility Window** - Identify your fertile days based on your cycle data
- 🔐 **Privacy First** - All data is stored locally with optional cloud sync
- 📱 **Cross-Platform** - Access your data across multiple devices

### User Experience
- Intuitive and user-friendly interface
- Customizable cycle and period length settings
- Dark mode support for comfortable viewing
- Export data for personal records or medical consultations
- Historical cycle data visualization
- Personalized insights and recommendations

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Git

### From Source

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zhilips/Zperiod.git
   cd Zperiod
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   python main.py
   ```

### Using pip
```bash
pip install zperiod
zperiod
```

### Docker Installation
```bash
docker build -t zperiod .
docker run -it zperiod
```

## Usage

### Getting Started

1. **Launch the application** and complete the initial setup
2. **Enter your cycle information** - provide average cycle length and period duration
3. **Log your period** - mark the first day of your period in the calendar
4. **View insights** - access analytics and predictions based on your data

### Logging Period Data

```python
# Example: Using the Python API
from zperiod import PeriodTracker

tracker = PeriodTracker()
tracker.log_period(start_date='2026-01-07', duration=5)
```

### Viewing Analytics

- **Calendar View** - Visual representation of your cycle
- **Statistics Dashboard** - Average cycle length, period duration, and patterns
- **Predictions** - Estimated dates for your next period and fertile window
- **Reports** - Generate detailed reports for personal or medical use

### Customization

Access settings to customize:
- Cycle length preferences
- Notification frequency and type
- Theme preferences (light/dark mode)
- Data privacy settings
- Export formats

### Example Workflows

**Track a New Period:**
1. Open the app and navigate to the calendar
2. Click on your period's start date
3. Select "Log Period" and confirm duration
4. Add any symptoms or notes

**Check Fertility Window:**
1. Go to the "Insights" tab
2. View the highlighted fertile days
3. Review fertility probability percentage

## Screenshots

### Calendar View
Shows your complete menstrual cycle with color-coded indicators:
- Red: Period days
- Green: Fertile window
- Blue: Safe days

### Dashboard Analytics
Displays comprehensive statistics including:
- Average cycle length
- Period duration trends
- Symptom patterns
- Cycle regularity insights

### Symptom Tracker
Log and track:
- Physical symptoms (cramps, headaches, fatigue)
- Mood changes
- Energy levels
- Sleep quality

*Note: Screenshots will be added in the next update*

## Configuration

### Settings File

Edit `config.json` to customize:

```json
{
  "cycle_length": 28,
  "period_duration": 5,
  "notifications": {
    "enabled": true,
    "reminder_days_before": 1,
    "time": "09:00"
  },
  "theme": "dark",
  "language": "en",
  "privacy": {
    "cloud_sync": false,
    "encrypt_data": true
  }
}
```

### Environment Variables

```bash
ZPERIOD_DATA_PATH=/path/to/data
ZPERIOD_THEME=dark
ZPERIOD_NOTIFICATIONS=true
```

## Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started with Development

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/Zperiod.git
   cd Zperiod
   ```
3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Setup

```bash
# Install development dependencies
pip install -r requirements-dev.txt

# Run tests
pytest

# Run linter and formatter
black .
flake8 .
```

### Code Guidelines

- Follow PEP 8 style guidelines
- Write descriptive commit messages
- Add unit tests for new features
- Update documentation accordingly
- Ensure all tests pass before submitting PR

### Commit Message Format

```
type(scope): description

body (optional)

footer (optional)
```

Examples:
- `feat(tracker): add symptom logging feature`
- `fix(calendar): resolve date display issue`
- `docs(readme): update installation instructions`

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for your changes
3. **Ensure code quality:**
   ```bash
   pytest
   black --check .
   flake8 .
   ```
4. **Submit your PR** with a clear description:
   - What problem does it solve?
   - How have you tested it?
   - Any breaking changes?

5. **Respond to reviews** promptly and professionally

### Reporting Issues

Found a bug? Please report it:

1. Check if the issue already exists
2. Provide a clear title and description
3. Include steps to reproduce
4. Attach relevant logs or screenshots
5. Specify your environment (OS, Python version, etc.)

### Feature Requests

Have an idea? We'd love to hear it:

1. Describe the feature clearly
2. Explain why it would be useful
3. Provide example use cases
4. Discuss potential implementation approach

## Project Structure

```
Zperiod/
├── src/
│   ├── main.py
│   ├── tracker.py
│   ├── ui/
│   ├── analytics/
│   └── utils/
├── tests/
│   ├── test_tracker.py
│   └── test_analytics.py
├── docs/
│   ├── installation.md
│   ├── usage.md
│   └── api.md
├── requirements.txt
├── setup.py
└── README.md
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

### Getting Help

- **Documentation:** Check our [docs](docs/) folder
- **Issues:** Search existing [GitHub Issues](https://github.com/Zhilips/Zperiod/issues)
- **Discussions:** Join our [GitHub Discussions](https://github.com/Zhilips/Zperiod/discussions)
- **Email:** Contact us at support@zperiod.app

### Troubleshooting

**App won't start:**
- Verify Python version (3.8+)
- Reinstall dependencies: `pip install -r requirements.txt --force-reinstall`
- Check error logs in `logs/` directory

**Data not syncing:**
- Verify cloud sync is enabled in settings
- Check internet connection
- Review privacy settings

**Notifications not working:**
- Ensure notifications are enabled in settings
- Check system notification permissions
- Verify correct time is set

## Acknowledgments

- Built with ❤️ for women's health
- Special thanks to all contributors
- Inspired by privacy-first health tracking principles

## Roadmap

Upcoming features:
- AI-powered cycle predictions
- Integration with wearable devices
- Community insights (anonymous)
- Multi-language support expansion
- Mobile app (iOS/Android)

---

**Last Updated:** 2026-01-07

For more information, visit our [website](https://zperiod.app) or follow us on social media.

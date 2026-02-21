# Athan App (Expo + React Native)

A location-based Islamic prayer time application built with **React Native and Expo Router**.
The app provides accurate prayer timings based on the user's real-time GPS location, along with Sehri (Imsak), Iftar (Maghrib), Hijri date, and smart local notifications.

This project is designed with a **production-level architecture** similar to apps like *Muslim Pro* and focuses on accuracy, offline support, and battery optimization.

---

## Features

### Core Features

* Real-time **Prayer Times** based on GPS location
* **Sehri (Imsak)** and **Iftar (Maghrib)** timings
* **Hijri Date** display
* Automatic **Calculation Method detection** by country
* Monthly prayer calendar (offline support)

### Smart Capabilities

* High-accuracy GPS location
* Auto update when user changes city
* Local scheduled **Athan notifications** (works even if app is closed)
* Offline-first architecture
* Battery-optimized location usage

### Ramadan Mode

* Sehri countdown
* Iftar countdown
* Special Ramadan alerts

### Upcoming Features

* Qibla Compass
* Prayer time adjustments (+/- minutes)
* Multiple Athan sounds
* Silent mode during prayer
* Nearby Mosques (Google Maps)

---

## Tech Stack

**Frontend**

* React Native
* Expo
* Expo Router
* TypeScript

**Expo Modules**

* expo-location
* expo-notifications
* expo-sensors (Qibla – planned)
* AsyncStorage

**API**

* [AlAdhan Prayer Times API](https://aladhan.com/prayer-times-api)

---

## Project Structure(will update later)

```
app/
 ├── _layout.tsx
 ├── index.tsx            # Home (Prayer Times)
 ├── qibla.tsx
 └── settings.tsx

src/
 ├── components/
 ├── hooks/
 ├── services/
 ├── store/
 ├── utils/
 └── notifications/
```

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/your-username/athan-app.git
cd athan-app
```

### 2. Install dependencies

```
npm install
```

### 3. Start the project

```
npx expo start
```

Run on:

* Expo Go (Android / iOS)
* Emulator

---

## How It Works

1. App requests location permission
2. Fetches latitude & longitude
3. Retrieves monthly prayer times from AlAdhan API
4. Stores data locally for offline usage
5. Schedules local Athan notifications

---

## Calculation Methods

The app automatically selects the correct method based on location:

| Region           | Method              |
| ---------------- | ------------------- |
| India / Pakistan | Karachi             |
| Saudi Arabia     | Umm al-Qura         |
| USA              | ISNA                |
| Europe           | Muslim World League |

Users can override this in Settings.

---

## Privacy

* Location is used only to calculate prayer times
* No personal data is stored or shared
* No continuous background tracking

---

## Roadmap

* [ ] Qibla Compass
* [ ] Firebase integration
* [ ] User accounts
* [ ] Premium features
* [ ] Widgets
* [ ] Wear OS / Apple Watch support

---

## Contributing

Contributions, issues, and feature requests are welcome!

---

## License

MIT License

---

## Author

Built by **Sk Alamin**

# Service Card Background Images

This directory contains the background imagery displayed on the service cards across the site.

## Service Card Image Mapping

| Service Slug | Card Title | Current Background Image | Custom Replacement Options |
|---|---|---|---|
| `recruitment` | Recruitment | `/services/recruitment.png` | `recruitment.png` / `recruitment.jpg` / `recruitment.svg` |
| `manpower-supply` | Manpower Supply | `/services/manpower-supply.png` | `manpower-supply.png` / `manpower-supply.jpg` / `manpower-supply.svg` |
| `hr-outsourcing` | HR Outsourcing | `/services/hr-outsourcing.png` | `hr-outsourcing.png` / `hr-outsourcing.jpg` / `hr-outsourcing.svg` |
| `payroll` | Payroll Services | `/services/payroll.png` | `payroll.png` / `payroll.jpg` / `payroll.svg` |
| `peo` | Employer Services | `/services/peo.png` | `peo.png` / `peo.jpg` / `peo.svg` |
| `it-staffing` | IT Staffing | `/services/it-staffing.png` | `it-staffing.png` / `it-staffing.jpg` / `it-staffing.svg` |

## How to Customize

1. **Replace an image directly**:  
   Drop your custom photo or vector graphic into this `public/services/` folder using the exact service slug (e.g. `recruitment.jpg` or `recruitment.svg`).

2. **Recommended Specs**:
   - **Aspect Ratio**: 4:3 (e.g., `800x600` or `1200x900`) or 16:9 (`1200x675`).
   - **Formats**: `.svg`, `.png`, `.jpg`, `.webp`.
   - **Visual Contrast**: Darker backgrounds with atmospheric lighting work best with the card typography and translucent glass effects.

3. **Custom URL in code**:
   You can also specify a custom image URL directly on the `services` array in `src/lib/content.ts` via the `image` field.

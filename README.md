# ctytone.github.io

Personal portfolio for Christopher Tytone, served by GitHub Pages at https://ctytone.github.io.

A single page in plain HTML, CSS and a little JavaScript. No framework and no build step.

## Sections

1. **Hero**: name, one-line identity, and LinkedIn, Resume and GitHub buttons
2. **Projects**: curated project cards (currently Setlist and Google Tasks Importer)
3. **About**
4. **Contact**: email, LinkedIn and GitHub

## Files

- `index.html`: all page content
- `styles.css`: styles (mobile first, with a wider layout from 720px)
- `files/Tytone_Resume.pdf`: the resume linked from the Resume button
- `images/headshot.jpg`: square crop of the headshot shown in the hero

## Adding a project

Copy an `<article class="project">` block in `index.html` and edit it. The grid fits a third card automatically.

- **Screenshot or GIF:** replace the placeholder `<div class="project-media placeholder">` with `<img class="project-media" src="images/your-shot.png" alt="...">` (16:10 works best).
- **Live button:** add `<a class="btn btn-small btn-primary" href="...">Live</a>` before the Code button only when the project has a live link. Leave it out otherwise.

## Updating the resume

Replace `files/Tytone_Resume.pdf` with the new PDF, keeping the same filename so the link keeps working.

## Previewing locally

```sh
python3 -m http.server
```

Then open http://localhost:8000.

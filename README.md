# Lab-6-Enginyeria-de-Prompts-amb-GitHub-a-partir-de-Requisits-Funcionals

https://github.com/Quivor33/Lab-6-Enginyeria-de-Prompts-amb-GitHub-a-partir-de-Requisits-Funcionals/

Aquests són els prompts que hem utilitzat per generar el nostre projecte, un primer per inicialitzar la estructura base en la que el copilot també ha fet una versió bàsica d'algunes features, el segon prompt ha servit per redefinir l'estructura del projecte per així poder treballar les user stories per separat cada membre del grup i els següents prompts són per acabar de detallar les features ia existents o crear-ne de noves perquè compleixin les demandes de les històries de usuari.

### Prompt 1 (Estructura base del projecte):

Create a React application in TypeScript for a recipe management system. 
The app should have a clean layout with a header showing "Gestió de Receptes", 
a main content area, and use React hooks for state management. 
Set up the basic folder structure with components/, types/ and use localStorage 
to persist recipe data between sessions. 
Each recipe should have: id, name, ingredients (array of strings), steps (array of strings), and createdAt date.
Refactor the current project structure so that each of the 4 user stories 
can be developed independently by different team members with minimal merge conflicts.

### Prompt 2 (Redefinir l’estructura del projecte per parts):

Apply the following folder structure:

src/
├── features/
│   ├── add-recipe/         ← US-01
│   │   ├── AddRecipeForm.tsx
│   │   ├── AddRecipeForm.css
│   │   └── index.ts
│   ├── search-recipe/      ← US-02
│   │   ├── SearchBar.tsx
│   │   ├── SearchBar.css
│   │   └── index.ts
│   ├── edit-recipe/        ← US-03
│   │   ├── EditRecipeForm.tsx
│   │   ├── EditRecipeForm.css
│   │   └── index.ts
│   └── delete-recipe/      ← US-04
│       ├── DeleteRecipeButton.tsx
│       ├── DeleteRecipeButton.css
│       └── index.ts
├── shared/
│   ├── types/
│   │   └── Recipe.ts       ← shared Recipe type/interface
│   ├── hooks/
│   │   └── useRecipes.ts   ← shared custom hook (localStorage logic)
│   ├── components/
│   │   └── RecipeCard.tsx  ← shared card used by multiple features
│   └── utils/
│       └── storage.ts      ← get/save/delete helpers for localStorage
└── App.tsx                 ← only imports and composes the 4 features

Rules to follow:
- Each feature folder must be self-contained: its own component, styles and index.ts export.
- NO feature should import from another feature folder directly.
- All shared logic (Recipe type, localStorage helpers, useRecipes hook) must live in shared/.
- App.tsx must only compose the features together, with no business logic of its own.
- Keep the existing functionality intact while applying this new structure.
- Each index.ts should re-export the main component so imports stay clean.

### Prompt 3 US-01:

Refine the existing AddRecipeForm.tsx component. Keep the current props interface 
(onAddRecipe) and file location unchanged.

Make these specific improvements:

1. DYNAMIC LISTS: Replace the ingredients textarea with a dynamic list. 
   Add an individual text input + "Afegeix ingredient" button that appends 
   items to a list below. Each item shows a remove (×) button. 
   Do the same for steps. 
   Keep the internal state as string[] (not a joined string).

2. TOAST NOTIFICATION: After a successful submit, show a green toast message 
   "Recepta afegida correctament" that auto-dismisses after 3 seconds. 
   Implement it inside the component using a useState + setTimeout, 
   no external library needed.

3. CANCEL BUTTON: Add a "Neteja el formulari" button (secondary style) 
   next to the submit button that resets all fields to empty without submitting.

4. INLINE VALIDATION: Show a red error message below each field if the user 
   tries to submit with: empty name, zero ingredients, or zero steps. 
   Clear the error as soon as the user adds content to that field.

Do not modify any file outside src/features/add-recipe/.

### Prompt 4 US-02:

Refine the existing SearchBar.tsx component. Keep the current props interface 
(searchTerm, onSearchChange) unchanged so App.tsx does not need to change.

Make these specific improvements:

1. SCOPE LABEL: Update the input label and placeholder to make clear the search 
   is by name or ingredient only (not by steps). 
   Update the label to: "Cerca per nom o ingredient"
   Update the placeholder to: "Ex: arròs, tomàquet..."

2. CLEAR BUTTON: When searchTerm is not empty, show a small × icon button 
   inside the input (positioned absolutely to the right) that calls 
   onSearchChange('') to clear the search. Hide it when the input is empty.

3. RESULTS COUNTER: Add a new optional prop: resultCount?: number. 
   When provided and searchTerm is not empty, show below the input:
   - "{resultCount} recepta(s) trobada(s)" if resultCount > 0
   - "No s'han trobat receptes" in red if resultCount === 0
   When searchTerm is empty, show nothing.

4. Update the index.ts export and update App.tsx only to pass 
   resultCount={filteredRecipes.length} to SearchBar.

Do not modify any other shared or feature file.

### Prompt 5 US-03:

Refine the existing EditRecipeForm.tsx component. Keep the current props interface 
(recipe, onSave, onCancel) unchanged.

Make these specific improvements:

1. DYNAMIC LISTS: Replace the ingredients and steps textareas with the same 
   dynamic list pattern as AddRecipeForm: individual input + "Afegeix" button, 
   each item with a remove (×) button. 
   Pre-fill the lists from recipe.ingredients and recipe.steps when a recipe 
   is selected (the existing useEffect handles this — adapt it).

2. TOAST NOTIFICATION: After a successful save, show a green toast 
   "Recepta actualitzada correctament" that auto-dismisses after 3 seconds.

3. CANCEL WITH WARNING: When the user clicks "Cancel·la" and has made changes 
   (i.e. current values differ from the original recipe), show a browser 
   confirm() dialog: "Tens canvis sense desar. Vols descartar-los?" 
   Only call onCancel if the user confirms.

4. INLINE VALIDATION: Same as AddRecipeForm — show red error messages 
   below each field on submit if name is empty, or lists have zero items.

Do not modify any file outside src/features/edit-recipe/.

### Prompt 6 US-04:

Refine the existing DeleteRecipeButton.tsx component. Keep the current props 
interface (recipeId, onDelete) unchanged so App.tsx does not need to change.

Make these specific improvements:

1. CONFIRMATION DIALOG: When the user clicks "Esborra", do NOT delete immediately. 
   Instead, show an inline confirmation UI (not a browser confirm() dialog) 
   that replaces the button with two buttons side by side:
   - "Sí, esborra" (danger style) → calls onDelete(recipeId)
   - "Cancel·la" (secondary style) → returns to the normal "Esborra" button
   Add a text label above the two buttons: "Estàs segur?"
   Use local useState to manage this confirmation state.

2. TOAST NOTIFICATION: After onDelete is called, show a red/orange toast message 
   "Recepta eliminada correctament" that auto-dismisses after 3 seconds.
   Implement using useState + setTimeout inside the component.

3. STYLES: Add the necessary CSS in DeleteRecipeButton.css for the inline 
   confirmation state (compact layout, small font, smooth transition).

Do not modify any file outside src/features/delete-recipe/.


## Captures de pantalla del resultat:

### US-01. Afegir noves receptes
<img width="1042" height="542" alt="image" src="https://github.com/user-attachments/assets/c4cfd53b-31b0-45db-9253-0cffd146cc45" />

### US-02. Cercar receptes
<img width="1038" height="723" alt="image" src="https://github.com/user-attachments/assets/80b0aa6b-e0ba-4701-a157-3227e9416dc8" />

### US-03. Editar receptes
<img width="476" height="881" alt="image" src="https://github.com/user-attachments/assets/5d7ba5f6-c9d1-402b-a1a7-bfa8a8764866" />

### US-04. Eliminar receptes
<img width="556" height="450" alt="image" src="https://github.com/user-attachments/assets/c072f16f-8fa4-4868-adc0-ae1b123607ba" />
<img width="557" height="366" alt="image" src="https://github.com/user-attachments/assets/ac7dc352-9851-44d4-a13d-bc38ca0812dd" />




## Reflexió sobre l'ús de GitHub Copilot:

GitHub Copilot ha resultat ser una eina molt útil a l'hora de desenvolupar aquesta aplicació, ja que ha permès agilitzar significativament la generació de codi a partir dels requisits funcionals. Gràcies als prompts, hem pogut obtenir components funcionals en molt poc temps i centrar-nos més en el disseny de la solució que no pas en la implementació detallada.

Tot i això, hem après que cal anar amb molta cura i revisar sempre els resultats de cada prompt abans d'acceptar-los. En diverses ocasions hem observat que Copilot fa més feina de la que se li demana: modifica fitxers que no s'han especificat, afegeix funcionalitats no sol·licitades o reestructura codi que ja funcionava correctament. Com que té la capacitat d'editar arxius directament al projecte, un canvi no revisat pot trencar parts de l'aplicació que estaven funcionant o generar conflictes innecessaris entre els membres de l'equip.

Per aquest motiu, la conclusió principal és que Copilot és una eina poderosa però que requereix supervisió constant. La qualitat del resultat depèn tant de la precisió dels prompts com de la revisió crítica del codi generat.

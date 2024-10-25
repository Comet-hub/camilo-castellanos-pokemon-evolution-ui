import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]),
[hidden] {
  display: none !important;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

bbva-core-heading {
  margin-bottom: 1rem;
}

[aria-level="1"] {
  font-size: 2.5rem;
}

[aria-level="2"] {
  font-size: 2rem;
}

[aria-level="3"] {
  font-size: 1.5rem;
}

[aria-level="4"] {
  font-size: 1.25rem;
}

[aria-level="5"] {
  font-size: 1rem;
}

[aria-level="6"] {
  font-size: 0.75rem;
}

.evolutions-container {
  display: flex;
  gap: 1rem;
}

bbva-core-heading {
  text-align: center;
  font-weight: bold;
  margin: 2rem;
}

bbva-web-link {
  display: flex;
  align-items: center;
  margin: 1rem;
  color: rgb(41, 156, 251);
  cursor: pointer;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.evolution-tree {
  border-radius: 1rem;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.03), 0px 2px 30px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.03);
  padding: 1rem;
}

.arrow {
  margin: 0.5rem;
  color: lightgrey;
}
`;

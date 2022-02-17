import Editor from './components/Editor.vue';
import FileUpload from './components/FileUpload.vue';
import Login from './components/Login.vue';
import Table from './components/Table.vue';

//#region Dialog

import ImageUpload from './components/Dialog/ImageUpload.vue';

//#endregion

//#region Input

// Field
import FieldDate from './components/Input/FieldDate.vue';
import FieldDateTime from './components/Input/FieldDateTime.vue';
import FieldInput from './components/Input/FieldInput.vue';
import FieldSelect from './components/Input/FieldSelect.vue';

// Filter
import FilterDate from './components/Input/FilterDate.vue';
import FilterDateTime from './components/Input/FilterDateTime.vue';
import FilterInput from './components/Input/FilterInput.vue';
import FilterSelect from './components/Input/FilterSelect.vue';

// Popup
import PopupDate from './components/Input/PopupDate.vue';
import PopupEditInput from './components/Input/PopupEditInput.vue';
import PopupInput from './components/Input/PopupInput.vue';
import PopupSelect from './components/Input/PopupSelect.vue';

//#endregion

//#region Layout

import AdminLayout from './components/layouts/AdminLayout.vue';

import Menu from './components/layouts/Menu.vue';

import Base from './components/layouts/Section/Base.vue';
import Detail from './components/layouts/Section/Detail.vue';
import DetailWithList from './components/layouts/Section/DetailWithList.vue';
import DetailWithTree from './components/layouts/Section/DetailWithTree.vue';

//#endregion

const version = __UI_VERSION__;

function install(app) {
  app.component(Editor.name, Editor);
  app.component(FileUpload.name, FileUpload);
  app.component(Login.name, Login);
  app.component(Table.name, Table);

  //#region Dialog

  app.component(ImageUpload.name, ImageUpload);

  //#endregion

  //#region Input

  // // Field
  app.component(FieldDate.name, FieldDate);
  app.component(FieldDateTime.name, FieldDateTime);
  app.component(FieldInput.name, FieldInput);
  app.component(FieldSelect.name, FieldSelect);

  // Filter
  app.component(FilterDate.name, FilterDate);
  app.component(FilterDateTime.name, FilterDateTime);
  app.component(FilterInput.name, FilterInput);
  app.component(FilterSelect.name, FilterSelect);

  // Popup
  app.component(PopupDate.name, PopupDate);
  app.component(PopupEditInput.name, PopupEditInput);
  app.component(PopupInput.name, PopupInput);
  app.component(PopupSelect.name, PopupSelect);

  //#endregion

  //#region Layout

  // AdminLayout
  app.component(AdminLayout.name, AdminLayout);

  // Menu
  app.component(Menu.name, Menu);

  // Section
  app.component(Base.name, Base);
  app.component(Detail.name, Detail);
  app.component(DetailWithList.name, DetailWithList);
  app.component(DetailWithTree.name, DetailWithTree);

  //#endregion
}

export {
  version,
  install,
  // Components
  Editor,
  FileUpload,
  Login,
  Table,
  // Dialog
  ImageUpload,
  // Input - Field
  FieldDate,
  FieldDateTime,
  FieldInput,
  FieldSelect,
  // Input - Filter
  FilterDate,
  FilterDateTime,
  FilterInput,
  FilterSelect,
  // Input - Popup
  PopupDate,
  PopupEditInput,
  PopupInput,
  PopupSelect,
  // Layout - AdminLayout
  AdminLayout,
  // Layout - Menu
  Menu,
  // layout - Section
  Base,
  Detail,
  DetailWithList,
  DetailWithTree,
};

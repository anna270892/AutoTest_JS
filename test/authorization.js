// @ts-check

const { expect } = require("@playwright/test");


async function validLogin(page, getByLabel) {
  const loginInput = await getByLabel;
  await loginInput.click();
  await loginInput.fill("---");
}

async function validPassword(page, getByLabel) {
  const passwordInput = await getByLabel;
  await passwordInput.click();
  await passwordInput.fill("---");
}

//Авторизация под Администратором
async function validAuthorizationAdmin(page, locatorLogin, locatorPassword) {
  const login = await validLogin(page, locatorLogin);
  const password = await validPassword(page, locatorPassword);
  await page.getByRole('button', { name: 'Войти' }).click();
}

async function inputLoginValue(page, getByLabel, value) {
  const loginInput = await getByLabel;
  await loginInput.click();
  await loginInput.fill(value);
}

async function inputLoginClear(page, getByLabel) {
  const loginInput = await getByLabel;
  await loginInput.click();
  await loginInput.fill('');
}

//ввод пароля зашифрованного точками
async function inputPasswordValue(page, getByLabel, value) {
  const passwordInput = await getByLabel;
  await passwordInput.click();
  await passwordInput.fill(value);
}

//ввод пароля с нажатием на кнопку глазик "Показать пароль"
async function inputPasswordValue_ShowPassword(page, getByLabel, value) {
  await page.getByLabel('toggle password visibility').click();
  const passwordInput = await getByLabel;
  await passwordInput.click();
  await passwordInput.fill(value);
}


async function inputPasswordClear(page, getByLabel) {
  const passwordInput = await getByLabel;
  await passwordInput.click();
  await passwordInput.fill('');
}

//Удаление сотрудника из БД youtrackViewer
async function clearWorker(page, locatorLogin, locatorPassword) {
  validAuthorizationAdmin(page, locatorLogin, locatorPassword);
  await page.getByLabel('Подразделение').click();
  await page.locator('div').filter({ hasText: /^---$/ }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Удалить из БД' }).click();
  await page.getByRole('button', { name: 'Администратор' }).click();
}

//Добавление сотрудника в БД youtrackViewer
async function addWorker(page, locatorLogin, locatorPassword) {
  validAuthorizationAdmin(page, locatorLogin, locatorPassword);
  await page.getByLabel('Подразделение').click();
  await page.getByRole('button', { name: '---' }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Добавить сотрудников' }).click();
  await page.getByLabel('Создать нового сотрудника').click();
  await page.getByLabel('Логин *').click();
  await page.getByLabel('Логин *').fill('---');
  await page.getByLabel('Фамилия *').click();
  await page.getByLabel('Фамилия *').fill('---');
  await page.getByLabel('Имя *').click();
  await page.getByLabel('Имя *').fill('---');
  await page.getByLabel('Отчество *').click();
  await page.getByLabel('Отчество *').fill('---');
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await page.getByRole('button', { name: 'Применить' }).click();
}


//Добавить Начальника группы с сотрудниками
async function addBoss(page, locatorLogin, locatorPassword) {
  validAuthorizationAdmin(page, locatorLogin, locatorPassword);
  await page.getByLabel('Подразделение').click();
  await page.getByRole('button', { name: '---' }).getByRole('button').nth(1).click();
  await page.getByPlaceholder('Добавить группу').click();
  await page.getByPlaceholder('Добавить группу').fill('Тестовый отдел');
  await page.locator('form').getByRole('button').click();
  await page.getByRole('button', { name: 'Применить' }).click();
  await page.getByRole('button', { name: 'Тестовый отдел' }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Добавить сотрудников' }).click();
  await page.getByLabel('---').check();
  await page.getByLabel('---').check();
  await page.getByLabel('---').check();
  await page.getByLabel('---').check();
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await page.getByRole('button', { name: 'Изменить начальника' }).nth(3).click();
  await page.getByRole('button', { name: 'Применить' }).click();
  await page.getByRole('button', { name: 'Администратор' }).click();
}

//Копирование из одного поля в другое
async function ctrl(page, locator1, locator2, value) {
  const locator_1 = await locator1;
  const locator_2 = await locator2;
  await locator_1.fill(value);
  await locator_1.press("Enter");
  await locator_1.click();
  await page.getByLabel('toggle password visibility').click();
  await locator_1.press("Control+a");
  await locator_1.press("Control+c");
  await locator_2.click();
  await locator_2.press("Control+a");
  await locator_2.press("Control+v");
}


module.exports = {
  inputLoginValue,
  inputPasswordValue,
  inputPasswordValue_ShowPassword,
  inputLoginClear,
  inputPasswordClear,
  validAuthorizationAdmin,
  clearWorker,
  addWorker,
  addBoss,
  ctrl,
};
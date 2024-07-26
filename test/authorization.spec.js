// @ts-check
const { test, expect } = require("@playwright/test");
const { inputLoginValue,
  inputPasswordValue,
  inputPasswordValue_ShowPassword,
  inputLoginClear,
  inputPasswordClear,
  validAuthorizationAdmin,
  clearWorker,
  addWorker,
  addBoss,
  ctrl,} = require("./authorization");

test.describe("Авторизация", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://0.0.0.1:3000");
    const locatorLogin = page.getByLabel('Логин');
    await inputLoginClear(page, locatorLogin);
    const locatorPassword = page.getByLabel('Пароль');
    await inputPasswordClear(page, locatorPassword);
  });

  test.describe("Открытие окна авторизации, кейс ---", async () => {
    test("Открытие окна авторизации", async ({ page }) => {
      const locator = await page.getByText('Чтобы начать работу войдите в учётную запись');
      await expect(locator).toHaveClass('MuiTypography-root MuiTypography-body1 css-wzyras');
      await page.goto("http://0.0.0.1:3000/#/auth");
      await expect(locator).toHaveClass('MuiTypography-root MuiTypography-body1 css-wzyras');
    });
  });

  test.describe("Поле Логин, кейс ---", async () => {
    test("Буквы верхний регистр", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "ОЛВРОНПАЕКВУКЫУКЫНПГОЛШЛОЬОЬЛДРТ");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("ОЛВРОНПАЕКВУКЫУКЫНПГОЛШЛОЬОЬЛДРТ");
    });

    test("Буквы нижний регистр", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "папвкуйёёё");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("папвкуйёёё");
    });

    test("Буквы верхний+нижний регистр", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "РОВЫРПРВАПВпапвкуйёёё");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("РОВЫРПРВАПВпапвкуйёёё");
    });

    test("Анг.язык верхний регистр", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "HSFDQWERPIUTXVBL");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("HSFDQWERPIUTXVBL");
    });

    test("Анг.язык нижний регистр", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "klsdkkjfjhdgfyuhdgyfhghdgf");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("klsdkkjfjhdgfyuhdgyfhghdgf");
    });

    test("Анг.язык верхний+нижний регистр", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "OPDJHGDGFDGdgfyuhdgyfhghdgf");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("OPDJHGDGFDGdgfyuhdgyfhghdgf");
    });

    test("Знак Собачка", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "@@@@@@@");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("@@@@@@@");
    });

    test("Спецсимволы", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "!#$%^&*()(*?:%;№/");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("!#$%^&*()(*?:%;№/");
    });

    test("Цифры", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "0123456789");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("0123456789");
    });

    test("Эмоджи", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "🙂🙂🙂🙂🙂🙂🙂");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("🙂🙂🙂🙂🙂🙂🙂");
    });

    test("Много 0", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "0000000000000000000000000000");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("0000000000000000000000000000");
    });

    test("Пробел в пустое поле", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "    ");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("");
    });

    test("1 пробел между словами", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "d d d");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("d d d");
    });

    test("Более 1 пробела между словами", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      await inputLoginValue(page, locatorLogin, "d    d        d");
      await locatorLogin.press("Enter");
      await expect(locatorLogin).toHaveValue("d d d");
    });

    //CTRL+A используется в методе

    test("CTRL+C", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      const locatorPassword = page.getByLabel('Пароль');
      await ctrl(page, locatorLogin, locatorPassword, "adjsd.dfjdf");
      await expect(locatorPassword).toHaveValue("adjsd.dfjdf");
    });

    test("CTRL+V", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      const locatorLogin = page.getByLabel('Логин');
      await ctrl(page, locatorPassword, locatorLogin, "123465465654");
      await expect(locatorPassword).toHaveValue("123465465654");
    });
  });

  test.describe("Поле Пароль, кейс ---", async () => {
    test("Буквы верхний регистр", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "ЗОЫАЫВАЕЫЕКАЫНГЙЁ");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("ЗОЫАЫВАЕЫЕКАЫНГЙЁ");
    });

    test("Буквы нижний регистр", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "ваотлываоы");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("ваотлываоы");
    });

    test("Буквы верхний+нижний регистр", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "ЩЫЫШГЫЕЫАКвйЁЁЁЁпапв");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("ЩЫЫШГЫЕЫАКвйЁЁЁЁпапв");
    });

    test("Анг.язык верхний регистр", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "YUFYIJUPOJKOPKPP");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("YUFYIJUPOJKOPKPP");
    });

    test("Анг.язык нижний регистр", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "lksdjuejheduysgdy");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("lksdjuejheduysgdy");
    });

    test("Анг.язык верхний+нижний регистр", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "KJJHughdshduGHGY");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("KJJHughdshduGHGY");
    });

    test("Спецсимволы", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "!#$%^&*()(*?:%;№/");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("!#$%^&*()(*?:%;№/");
    });

    test("Цифры", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "0123456789");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("0123456789");
    });

    test("Эмоджи", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "🙂🙂🙂🙂🙂🙂🙂");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("🙂🙂🙂🙂🙂🙂🙂");
    });

    test("Много 0", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "0000000000000000000000000000");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("0000000000000000000000000000");
    });

    test("Пробел в пустое поле", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "    ");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("");
    });

    test("1 пробел между словами", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "d d d");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("d d d");
    });

    test("Более 1 пробела между словами", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      await inputPasswordValue_ShowPassword(page, locatorPassword, "d    d        d");
      await locatorPassword.press("Enter");
      await expect(locatorPassword).toHaveValue("d d d");
    });

     //CTRL+A используется в методе

    test("CTRL+C", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      const locatorLogin = page.getByLabel('Логин');
      await ctrl(page, locatorPassword, locatorLogin, "adjsd.dfjdf");
      await expect(locatorPassword).toHaveValue("adjsd.dfjdf");
    });

    test("CTRL+V", async ({ page }) => {
      const locatorLogin = page.getByLabel('Логин');
      const locatorPassword = page.getByLabel('Пароль');
      await ctrl(page, locatorPassword, locatorLogin, "123465465654");
      await expect(locatorLogin).toHaveValue("123465465654");
    });
  });


  test.describe("Кнопка показать/скрыть пароль, кейс 34766", async () => {
    test("Кнопка показать/скрыть пароль", async ({ page }) => {
      const locatorPassword = page.getByLabel('Пароль');
      const locatorLogin = page.getByLabel('Логин');
      await inputPasswordValue(page, locatorPassword, "qwerty123456");
      await page.getByLabel('toggle password visibility').click();
      await expect(locatorPassword).toHaveAttribute('type', 'text');
      await page.getByLabel('toggle password visibility').click();
      await expect(locatorPassword).toHaveAttribute('type', 'password');
      await inputPasswordValue(page, locatorPassword, "");
      await ctrl(page, locatorPassword, locatorLogin, "123465465654");
      await expect(locatorPassword).toHaveAttribute('type', 'text');
      await page.getByLabel('toggle password visibility').click();
      await expect(locatorPassword).toHaveAttribute('type', 'password');
    });
  });


  test.describe("Авторизация под пользователями", async () => {
      test("Валидная авторизация под Администратором, кейс #23366", async ({ page }) => {
        const locatorLogin = page.getByLabel('Логин');
        const locatorPassword = page.getByLabel('Пароль');
        await validAuthorizationAdmin(page, locatorLogin, locatorPassword);
        const adminButton = await page.getByRole('button', { name: 'Администратор' });
        await expect(adminButton).toContainText('Администратор');
      });

      test("Валидная авторизация под Сотрудником, кейс #24547", async ({ page }) => {
        const locatorLogin = page.getByLabel('Логин');
        await inputLoginValue(page, locatorLogin, "---");
        const locatorPassword = page.getByLabel('Пароль');
        await inputPasswordValue(page, locatorPassword, "---");
        await page.getByRole('button', { name: 'Войти' }).click();
        const adminButton = await page.getByRole('button', { name: '---' });
        await expect(adminButton).toContainText('---');
      });

      test("Валидная авторизация под Начальником, кейс #24546", async ({ page }) => {
        const locatorLogin = page.getByLabel('Логин');
        const locatorPassword = page.getByLabel('Пароль');
        await addBoss(page, locatorLogin, locatorPassword);
        await inputLoginValue(page, locatorLogin, "---");
        await inputPasswordValue(page, locatorPassword, "---");
        await page.getByRole('button', { name: 'Войти' }).click();
        const adminButton = await page.getByRole('button', { name: '---' });
        await expect(adminButton).toContainText('---');
      });

      test("Авторизация с неверным Логином, кейс #33139", async ({ page }) => {
        const locatorLogin = page.getByLabel('Логин');
        await inputLoginValue(page, locatorLogin, "---");
        const locatorPassword = page.getByLabel('Пароль');
        await inputPasswordValue(page, locatorPassword, "---");
        await page.getByRole('button', { name: 'Войти' }).click();
        const textErrorElement = await page.getByRole('alert');
        await expect(textErrorElement).toContainText(' Неверный логин или пароль.  ');
      });

      test("Авторизация с неверным Паролем, кейс #33140", async ({ page }) => {
        const locatorLogin = page.getByLabel('Логин');
        await inputLoginValue(page, locatorLogin, "---");
        const locatorPassword = page.getByLabel('Пароль');
        await inputPasswordValue(page, locatorPassword, "---");
        await page.getByRole('button', { name: 'Войти' }).click();
        const textErrorElement = await page.getByRole('alert');
        await expect(textErrorElement).toContainText(' Ошибка авторизации пользователя.  ');
      });

      test("Авторизация под Сотрудником не добавленным в БД, кейс #23416", async ({ page }) => {
        const locatorLogin = page.getByLabel('Логин');
        const locatorPassword = page.getByLabel('Пароль');
        await clearWorker(page, locatorLogin, locatorPassword);
        await inputLoginValue(page, locatorLogin, "---");
        await inputPasswordValue(page, locatorPassword, "---");
        await page.getByRole('button', { name: 'Войти' }).click();
        const textErrorElement = await page.getByText('---, пожалуйста, обратитесь к Администратору для получения доступа к приложению');
        await expect(textErrorElement).toContainText('---, пожалуйста, обратитесь к Администратору для получения доступа к приложению');
      });

      test("Авторизация под Сотрудником не добавленным в БД с неверным Логином, кейс #33141", async ({ page }) => {
       const locatorLogin = page.getByLabel('Логин');
       const locatorPassword = page.getByLabel('Пароль');
       await inputLoginValue(page, locatorLogin, "---");
       await inputPasswordValue(page, locatorPassword, "---");
       await page.getByRole('button', { name: 'Войти' }).click();
       const textErrorElement = await page.getByText('Неверный логин или пароль');
       await expect(textErrorElement).toContainText('Неверный логин или пароль');
      });

      test("Авторизация под Сотрудником не добавленным в БД с неверным Паролем, кейс #33142", async ({ page }) => {
       const locatorLogin = page.getByLabel('Логин');
       const locatorPassword = page.getByLabel('Пароль');
       await inputLoginValue(page, locatorLogin, "---");
       await inputPasswordValue(page, locatorPassword, "---");
       await page.getByRole('button', { name: 'Войти' }).click();
       const textErrorElement =  await page.getByText('Ошибка авторизации пользователя');
       await expect(textErrorElement).toContainText('Ошибка авторизации пользователя.');
       //Добавление сотрудника обратно в БД
       await addWorker(page, locatorLogin, locatorPassword);
      });

      test("Авторизация под несуществующим сотрудником, кейс #33138", async ({ page }) => {
        const locatorLogin = page.getByLabel('Логин');
        await inputLoginValue(page, locatorLogin, "s.sssssss");
        const locatorPassword = page.getByLabel('Пароль');
        await inputPasswordValue(page, locatorPassword, "sssssss");
        await page.getByRole('button', { name: 'Войти' }).click();
        const textErrorElement = await page.getByRole('alert');
        await expect(textErrorElement).toContainText(' Неверный логин или пароль.  ');
      });
});
});

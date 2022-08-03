import { ElMessage } from "element-plus";
import { supabase } from "@/supabase";
import { getPagination } from "./utils";
import { useFiltersStore } from "./stores/filters";
import { unref } from "vue";

export const addData = async ({
  tableName = null,
  data: addData = null,
  manyTo = null,
  messageSuccess = "Успешно добавлено",
}) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (collectionName)!");
      return;
    }
    if (!addData) {
      ElMessage.error("Поле data не может быть пустым!");
      return;
    }

    const { data, error } = await supabase
      .from(tableName)
      .insert(addData, { upsert: true });

    if (manyTo) {
      const { error } = await supabase
        .from(manyTo.tableName)
        .insert(manyTo.data);

      if (error) throw error;
    }

    if (error) throw error;

    ElMessage.success(messageSuccess);
    return data;
  } catch (error) {
    ElMessage.error(`ОШИБКА!! ${error.message}`);
  }
};

export const getById = async ({
  tableName = null,
  id = null,
  select = "*",
}) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (tableName)!");
      return;
    }

    if (!id) {
      ElMessage.error("ID не может быть пустым!");
      return;
    }

    const { data, error } = await supabase
      .from(tableName)
      .select(select)
      .eq("id", id);

    // console.log("getById", data)

    if (error) throw error;
    return data[0];
  } catch (error) {
    ElMessage.error(`ОШИБКА!! ${error.message}`);
  }
};

export const getTable = async ({
  tableName = null,
  select = "*",
  key = null,
  pagination = false,
  page = 1,
  size = 10,
}) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (tableName)!");
      return;
    }
    if (page === 0) {
      ElMessage.error("Page не может быть 0!");
      return;
    }
    // Начинаем запрос
    let query = supabase
      .from(tableName)
      .select(select, { count: "exact" })
      .order("id", { ascending: true });

    //Фильтры
    const queryFilters = String(getFilters(tableName));
    if (queryFilters) {
      query = query.or(queryFilters);
    }

    //Пагинация
    if (pagination) {
      const { from, to } = getPagination(page - 1, size);

      query = query.range(from, to);

      //Выполняем запрос
      const { data, error, count } = await query;

      const pages = Math.floor((count + size - 1) / size);

      const next = pages > page;
      const prev = page !== 1;
      if (error) throw error;
      // Возвращаем данные с пагинацией
      return { data, count, next, prev };
    } else {
      //Данные без пагинации
      const { data, error, count } = await query;
      if (error) throw error;
      return { data, count };
    }
  } catch (error) {
    ElMessage.error(`ОШИБКА!! ${error.message}`);
    return { data: [] };
  }
};

export const getTableTest = async ({
  tableName = null,
  select = "*",
  key = null,
  pagination = false,
  page = 1,
  size = 10,
}) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (tableName)!");
      return;
    }
    if (page === 0) {
      ElMessage.error("Page не может быть 0!");
      return;
    }

    const { from, to } = getPagination(page - 1, size);

    const { data, error, count } = await query;

    const pages = Math.floor((count + size - 1) / size);

    const next = pages > page;
    const prev = page !== 1;
    if (error) throw error;

    return { data, count, next, prev };
  } catch (error) {
    console.error(error);
    ElMessage.error(`ОШИБКА!! ${error.message}`);
  }
};

////////////////////////////// Helpers

const getFilters = (key) => {
  const filterStore = useFiltersStore();
  let query = [];
  let filters = JSON.parse(JSON.stringify(filterStore.filtersByKey(key)));
  if (filters.length) {
    filters.forEach((el) => {
      const { name, value } = el;
      if (el.type === "Select") {
        if (value.length > 1) {
          value.forEach((e) => {
            query.push(`${name}.eq.${e}`);
          });
        } else query.push(`${name}.eq.${value}`);
      }
      if (el.type === "Input") {
        query.push(`${name}.ilike.%${value}%`);
      }
    });
  }
  // console.log("filters query", query)
  return query;
};

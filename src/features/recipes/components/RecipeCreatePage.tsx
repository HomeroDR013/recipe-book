import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAddRecipeMutation, useGetCategoriesQuery } from "../api/recipesApi";

const recipeSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(1, "La descripción es requerida"),
  ingredients: z
    .array(z.object({ value: z.string().min(1, "El ingrediente no puede estar vacío") }))
    .min(1, "Agrega al menos un ingrediente"),
  steps: z
    .array(z.object({ value: z.string().min(1, "El paso no puede estar vacío") }))
    .min(1, "Agrega al menos un paso"),
  category: z.string().min(1, "Selecciona una categoría"),
  difficulty: z.string().min(1, "Selecciona una dificultad"),
  prepTime: z.coerce.number().positive("El tiempo debe ser mayor a 0 minutos"),
  imageUrl: z.string().url("Ingresa una URL válida").or(z.literal("")),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

interface RecipeCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

export function RecipeCreateDialog({ open, onClose }: RecipeCreateDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [addRecipe, { isLoading: isSubmitting, error: submitError }] = useAddRecipeMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [{ value: "" }],
      steps: [{ value: "" }],
      category: "",
      difficulty: "",
      prepTime: 0,
      imageUrl: "",
    },
  });

  const ingredientFields = useFieldArray({ control, name: "ingredients" });
  const stepFields = useFieldArray({ control, name: "steps" });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: RecipeFormData) => {
    const recipe = {
      name: data.name,
      description: data.description,
      ingredients: data.ingredients.map((i) => i.value),
      steps: data.steps.map((s) => s.value),
      category: data.category,
      difficulty: data.difficulty,
      prepTime: data.prepTime,
      imageUrl: data.imageUrl || "https://placehold.co/400x300?text=Nueva+Receta",
    };
    try {
      const result = await addRecipe(recipe).unwrap();
      reset();
      onClose();
      navigate(`/recipes/${result.id}`);
    } catch {
      // error is displayed via submitError
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none";
  const errorClass = "text-red-600 text-xs mt-1";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 w-full max-w-2xl rounded-2xl p-0 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 rounded-t-2xl">
        <h2 className="text-xl font-bold text-gray-900">Nueva Receta</h2>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
        {submitError && (
          <p className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6">
            No se pudo guardar la receta. Intenta de nuevo.
          </p>
        )}

        <form id="recipe-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className={labelClass}>Nombre</label>
            <input {...register("name")} className={inputClass} placeholder="Nombre de la receta" />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              {...register("description")}
              className={inputClass}
              rows={2}
              placeholder="Describe brevemente la receta"
            />
            {errors.description && <p className={errorClass}>{errors.description.message}</p>}
          </div>

          {/* Category & Difficulty & Prep Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Categoría</label>
              <select {...register("category")} className={inputClass}>
                <option value="">Seleccionar...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className={errorClass}>{errors.category.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Dificultad</label>
              <select {...register("difficulty")} className={inputClass}>
                <option value="">Seleccionar...</option>
                <option value="Fácil">Fácil</option>
                <option value="Media">Media</option>
                <option value="Difícil">Difícil</option>
              </select>
              {errors.difficulty && <p className={errorClass}>{errors.difficulty.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Tiempo (min)</label>
              <input
                type="number"
                {...register("prepTime")}
                className={inputClass}
                placeholder="30"
              />
              {errors.prepTime && <p className={errorClass}>{errors.prepTime.message}</p>}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className={labelClass}>URL de imagen (opcional)</label>
            <input
              {...register("imageUrl")}
              className={inputClass}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.imageUrl && <p className={errorClass}>{errors.imageUrl.message}</p>}
          </div>

          {/* Ingredients */}
          <div>
            <label className={labelClass}>Ingredientes</label>
            {errors.ingredients?.root && (
              <p className={errorClass}>{errors.ingredients.root.message}</p>
            )}
            <div className="space-y-2">
              {ingredientFields.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`ingredients.${index}.value`)}
                    className={`flex-1 ${inputClass}`}
                    placeholder={`Ingrediente ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => ingredientFields.remove(index)}
                    disabled={ingredientFields.fields.length === 1}
                    className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {errors.ingredients && !errors.ingredients.root && (
                <p className={errorClass}>Revisa que todos los ingredientes tengan texto</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => ingredientFields.append({ value: "" })}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              + Agregar ingrediente
            </button>
          </div>

          {/* Steps */}
          <div>
            <label className={labelClass}>Pasos de preparación</label>
            {errors.steps?.root && (
              <p className={errorClass}>{errors.steps.root.message}</p>
            )}
            <div className="space-y-2">
              {stepFields.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <span className="mt-2 text-sm text-gray-400 w-6 text-right shrink-0">
                    {index + 1}.
                  </span>
                  <input
                    {...register(`steps.${index}.value`)}
                    className={`flex-1 ${inputClass}`}
                    placeholder={`Paso ${index + 1}`}
                  />
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => stepFields.swap(index, index - 1)}
                      disabled={index === 0}
                      className="px-2 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Mover arriba"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => stepFields.swap(index, index + 1)}
                      disabled={index === stepFields.fields.length - 1}
                      className="px-2 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Mover abajo"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => stepFields.remove(index)}
                      disabled={stepFields.fields.length === 1}
                      className="px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              {errors.steps && !errors.steps.root && (
                <p className={errorClass}>Revisa que todos los pasos tengan texto</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => stepFields.append({ value: "" })}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              + Agregar paso
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 rounded-b-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          form="recipe-form"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Guardando..." : "Guardar receta"}
        </button>
      </div>
    </dialog>
  );
}

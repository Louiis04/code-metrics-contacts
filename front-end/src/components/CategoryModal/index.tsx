import { useState, FormEvent } from "react";
import ReactDOM from "react-dom";
import { Button, Input, Loader } from "..";
import { CategoriesService } from "../../services";
import styles from "./styles.module.css";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (newCategory: { id: string; name: string }) => void;
}

export default function CategoryModal({ isOpen, onClose, onCategoryAdded }: CategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      setError("Nome da categoria é obrigatório");
      return;
    }

    setError("");
    setIsLoading(true);
    
    try {
      const newCategory = await CategoriesService.createCategory({ name: categoryName });
      onCategoryAdded(newCategory);
      setCategoryName("");
      onClose();
    } catch (error: any) {
      console.error("Erro ao criar categoria:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Erro ao criar categoria");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      {isLoading && <Loader isLoading={true} />}
      <div className={styles.modal}>
        <h2>Nova Categoria</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="categoryName">Nome da categoria</label>
            <Input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Ex: Amigos, Trabalho, Família"
            />
            {error && <p className={styles.errorText}>{error}</p>}
          </div>
          <div className={styles.buttonGroup}>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("global")!
  );
}
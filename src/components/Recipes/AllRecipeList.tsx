import { MatchedRecipeList } from './MatchedRecipeList';
import { RecipeList } from './RecipeList';

export const AllRecipeList: React.FC = () => {
  return (
    <div>
      <MatchedRecipeList />
      <RecipeList />
    </div>
  );
}

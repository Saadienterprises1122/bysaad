export interface AiLabProps {
  // Empty for now, can be extended in future
}

export type ToolType = 
  | 'code-refactor' 
  | 'sql-query' 
  | 'color-palette' 
  | 'regex-generator'
  | 'image-generator'
  | 'resume-analyzer'
  | 'user-persona'
  | 'readme-generator'
  | 'unit-test-writer'
  | 'api-ideas';

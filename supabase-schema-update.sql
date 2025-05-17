-- Atualização do esquema da tabela portfolio_items para adicionar a coluna item_type
ALTER TABLE IF EXISTS portfolio_items 
ADD COLUMN IF NOT EXISTS item_type TEXT DEFAULT 'artwork';

-- Comentário para explicar o propósito da coluna
COMMENT ON COLUMN portfolio_items.item_type IS 'Tipo de item no portfólio: artwork, exhibition, award, etc.';
